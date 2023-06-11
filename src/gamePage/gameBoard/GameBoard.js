

import * as Constants from '../../constants';

import { translate_blocks } from '../../runSimulation/CodeCreator';
import Game from './Game';
import Video from './Video'

import {React,useState, useEffect} from 'react';

import {sloved_game, get_game_level_data, post_code_api, get_level_commands} from '../gamesAPI';
import {setLevel} from '../../levelsPage/LevelProvider'

import { useNavigate } from 'react-router-dom'
import { DancerRunner } from '../../runSimulation/codeRunner/danceRunner';
import { StarsQuestRunner } from '../../runSimulation/codeRunner/starsQuestRunner';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover'

import '../game.css'
import stars_information from '../../images/stars_information.png'
import bombs_information from '../../images/bombs_information.png'
import play_img from '../../images/play-button.png'

import ErrorMessage from './../../alerts/ErrorMessage'

function GameBoard(props) {

    const [gameSence, setGameSence] = useState()
    const [error, setError] = useState("")
    const [runButtonDisabled, setRunButtonDisabled] = useState(true)
    const [videoDisplay, setVideoDisplay] = useState('block')
    const solution = props.solution
    const commands = props.commands
    const setGame = props.setGame
    const editor_code = props.code
    const leftSideView = props.leftSideView

    const [dataBoard, setDataBoard] = useState(props.game.data)


    const navigate = useNavigate();

    // const disription_game = {'dancer':"Dance with me",  'starsQuest':"Collect many stars"};
    const disription_game = new Map([
        ['dancer', "Dance with me"],
        ['starsQuest', "Collect many stars"],
    ])


    useEffect(() => {
        if(props.game.video_src !== undefined){
            setVideoDisplay('block')
        }
    }, [props.game.video_src]);


    useEffect(() => {
        if(props.commands !== null){
            setRunButtonDisabled(false)
        }
    }, [props.commands]);


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
        setRunButtonDisabled(true)
        await props.setSolution(null)
        await props.setCommands(null)
        setLevel(props.game.level_number+1)
        const levelData = await get_game_level_data()
        await setGame(levelData)
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
            if (props.game.game_name === "dancer"){
                runner= new DancerRunner(code, props.game.level_number, back_to_levels, next_level,retry_level, gameSence, props.game.blocks, leftSideView, props.game.expected_solution,solve)
            }
            else if(props.game.game_name === "starsQuest"){
                const copied_borad =[...dataBoard.map(row => [...row])]
                runner = new StarsQuestRunner(code,props.game.level_number, back_to_levels, next_level, retry_level, gameSence,copied_borad, props.game.blocks, leftSideView, props.game.expected_solution,solve, props.game.best_score)
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


    return (
       
        <div id="gameBoard">
              <div className={`error-${props.game.game_name}`}>
                {error !== "" && <ErrorMessage  text={error} setError={setError}></ErrorMessage>}
              </div>

            <div className='game-nav-container'>
                <ul className="nav nav-game">
                    <li className="nav-item">
                        <span className="nav-link" onClick={back_to_levels}> Levels </span>
                    </li>
                </ul> 
            </div>

        
            <div id={`game-screen-${props.game.game_name}`}>
                <div className={`controls`}>
                < span className='instruction'>{disription_game.get(props.game.game_name)}</span>
                <button className='game-button' onClick={get_code} disabled={runButtonDisabled}> <img src={play_img} alt="error"/></button>
                </div> 
          
                {props.game.game_name === 'starsQuest' &&
                <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverHoverFocus} >
                    <i className="information bi bi-info-circle info-icon"></i>
                </OverlayTrigger>} 
                { props.game.video_src !== undefined &&  <Video gameLevel = {props.game} display={videoDisplay}/>}
                <Game game_name = {props.game.game_name} level={props.game.level_number} setDataBoard = {setDataBoard} data={props.game.data} best_score={props.game.best_score}  setGameSence = {setGameSence} video_src={props.game.video_src}/>

            </div>
        </div>
    );
}

export default GameBoard;