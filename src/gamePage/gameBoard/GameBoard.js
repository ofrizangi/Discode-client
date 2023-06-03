

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

import ErrorMessage from './../../alerts/ErrorMessage'

function GameBoard(props) {

    const [gameSence, setGameSence] = useState()
    const [error, setError] = useState("")
    const solution = props.solution
    const commands = props.commands
    const setGame = props.setGame
    const editor_code = props.code
    const leftSideView = props.leftSideView


    const navigate = useNavigate();

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
            var runner;
            if (props.game.game_name === "dancer"){
                runner= new DancerRunner(code, back_to_levels, next_level, gameSence, props.game.blocks, leftSideView, props.game.expected_solution,solve)
            }
            else if(props.game.game_name === "starsQuest"){
                runner = new StarsQuestRunner(code, back_to_levels, next_level, gameSence,props.game.data, props.game.blocks, leftSideView, props.game.expected_solution,solve, props.game.best_score)
            }
            const ret_val = await runner.runcode()
            if(ret_val.includes(Constants.INFINITE_CODE) || ret_val.includes(Constants.COMPILATION_ERROR)){
                setError(ret_val)
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
            {error !== "" && <ErrorMessage text={error} setError={setError}></ErrorMessage>}

            { <button className='btn btn-success' onClick={get_code}> Run game</button>}

            {
                props.game.video_src !== undefined &&  <Video gameLevel = {props.game} />
            }
           
            <Game game_name = {props.game.game_name}  level={props.game.level_number} data = {props.game.data} best_score={props.game.best_score}  setGameSence = {setGameSence}/>
            
            {props.game !== null && props.game.game_name === 'starsQuest' &&
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="bottom"
                overlay={popoverHoverFocus}
                >
                <Button>Information</Button>
                </OverlayTrigger>
            }           

        </div>
    );
}

export default GameBoard;