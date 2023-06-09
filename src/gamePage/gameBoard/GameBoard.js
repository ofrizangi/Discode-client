

import * as Constants from '../../constants';

import { translate_blocks } from '../../runSimulation/CodeCreator';
import Game from './Game';
import Video from './Video'

import {React,useState} from 'react';

import {sloved_game, get_game_level_data, post_code_api} from '../gamesAPI';
import {setLevel} from '../../levelsPage/LevelProvider'

import { useNavigate } from 'react-router-dom'
import { DancerRunner } from '../../runSimulation/codeRunner/danceRunner';
import { StarsQuestRunner } from '../../runSimulation/codeRunner/starsQuestRunner';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover'
import Button from 'react-bootstrap/Button';

import '../game.css'
import stars_information from '../../images/stars_information.png'
import bombs_information from '../../images/bombs_information.png'
import play_img from '../../images/play-button.png'

import ErrorMessage from './../../alerts/ErrorMessage'

function GameBoard(props) {

    const [gameSence, setGameSence] = useState()
    const [error, setError] = useState("")
    const [runButtonDisabled, setRunButtonDisabled] = useState(false)
    const [videoDisplay, setVideoDisplay] = useState('block')

    // const [text, setText] = useState("")
    const solution = props.solution
    const commands = props.commands
    const setGame = props.setGame
    const editor_code = props.code
    const leftSideView = props.leftSideView

    let data_board = props.game.data;



    const navigate = useNavigate();

    // const disription_game = {'dancer':"Dance with me",  'starsQuest':"Collect many stars"};
    const disription_game = new Map([
        ['dancer', "Dance with me"],
        ['starsQuest', "Collect many stars"],
        ])



    const retry_level = () => {
        setRunButtonDisabled(false)
        var video = document.getElementById("myVideo")
        if (video !== undefined && video !== null){
            setVideoDisplay('block')
            video.currentTime = 0;
            video.pause();       
        }
    };

    
    async function solve() {
        if(leftSideView === 'editor'){
            await post_code_api(editor_code)
        }
        const my_game = await sloved_game()
        await setGame(my_game)
    }

    async function back_to_levels(){
        navigate('/levels')
    }



    async function next_level(){
        setLevel(props.game.level_number+1)
        const levelData = await get_game_level_data()
        setGame(levelData)
    }

    async function get_code() {
        setError("")
        const code = leftSideView === "blocks" ? await translate_blocks(commands, solution) : editor_code
        if(code.includes(Constants.COMPILATION_ERROR)){
            setError(code)
        }
        else {
            setRunButtonDisabled(true)
            var runner;
            setVideoDisplay('none')
            console.log(document.getElementById("gameBoard"))
            if (props.game.game_name === "dancer"){
                runner= new DancerRunner(code, back_to_levels, next_level,retry_level, gameSence, props.game.blocks, leftSideView, props.game.expected_solution,solve)
            }
            else if(props.game.game_name === "starsQuest"){
                runner = new StarsQuestRunner(code, back_to_levels, next_level, retry_level, gameSence,data_board, props.game.blocks, leftSideView, props.game.expected_solution,solve, props.game.best_score)
            }
            const ret_val = await runner.runcode()
            if(ret_val.includes(Constants.INFINITE_CODE) || ret_val.includes(Constants.COMPILATION_ERROR)){
                setError(ret_val)
                retry_level()
            }
        }
    }


    
    const popoverHoverFocus = (
        <Popover id="popover-trigger-hover-focus" title="Popover bottom">
            <div><strong>Legend</strong></div>
            <img src={stars_information} className='star' alt="error"></img>
            <img src={bombs_information} className='bombs' alt="error"></img>
        </Popover>
      );

      function setRandomData(){

        if (data_board && data_board[0] && data_board[0][0] && data_board[0][0] === "no_data"  ){

        let posotive_values = [0,1,2,3,4,5,6]
        let other_values = ["*",-2,-4,0]


        let numbers_rows = data_board.length
        let numbers_cols = data_board[0].length
        let arr = [];
        for (let i = 0; i < numbers_rows; i++) {
            arr[i] = [];
            for (let j = 0; j < numbers_cols; j++) {
                if (Math.random() < 0.8 || (i==0 && j==1)|| (i==1 && j==0)) {
                    arr[i][j] = posotive_values[Math.floor(Math.random() * posotive_values.length)]
                }
                else {
                    arr[i][j] = other_values[Math.floor(Math.random() * other_values.length)]
                }
            }
        }
        arr[0][0] = 0
        data_board = arr;
        }
        
        
    }


    return (
       
        <div id="gameBoard">
              <div className={`error-${props.game.game_name}`}>
              {error !== "" && <ErrorMessage  text={error} setError={setError}></ErrorMessage>}
            </div>
        
            <div id={`game-screen-${props.game.game_name}`}>
            <div className={`controls`}>
            < span className='instruction'>{disription_game.get(props.game.game_name)}</span>
            <button className='game-button' onClick={get_code} disabled={runButtonDisabled}><img src={play_img} alt="error"/></button>
            </div> 
            
            {props.game.game_name === 'starsQuest' &&
            <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverHoverFocus} >
                <i className="information bi bi-info-circle info-icon"></i>
            </OverlayTrigger>} 
  
           { props.game.video_src !== undefined &&  <Video gameLevel = {props.game} display={videoDisplay}/>}
           {setRandomData()}
            <Game game_name = {props.game.game_name}  level={props.game.level_number} data = {data_board} best_score={props.game.best_score}  setGameSence = {setGameSence} video_src={props.game.video_src}/>            
   
        
            </div>
            

        </div>
    );
}

export default GameBoard;