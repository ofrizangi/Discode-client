

import * as Constants from '../../constants';

import { translate_blocks } from '../../runSimulation/CodeCreator';
import Game from './Game';
import {React,useState} from 'react';

import {sloved_game, restart_game, get_game_level_data, post_code_api} from '../gamesAPI';
import {setLevel} from '../../levelsPage/LevelProvider'

import CompilationErrorMessage from '../../alerts/CompilationErrorMessage';
import { useNavigate } from 'react-router-dom'
import { DancerRunner } from '../../runSimulation/codeRunner/danceRunner';
import { StarsQuestRunner } from '../../runSimulation/codeRunner/starsQuestRunner';
import { getGame } from '../../mainPage/GameProvider';
import 'bootstrap/dist/css/bootstrap.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover'
import Button from 'react-bootstrap/Button';
import '../game.css'
import stars_information from '../../images/stars_information.png'
import bombs_information from '../../images/bombs_information.png'

function GameBoard(props) {


    // const [compilationOpen, setCompilationOpen] = useState(false)
    const [gameSence, setGameSence] = useState()
    // const [text, setText] = useState("")
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
        const code = leftSideView === "blocks" ? await translate_blocks(commands, solution) : editor_code
        if(code.includes(Constants.COMPILATION_ERROR)){
            alert(code)
        }
        else {
            var runner;
            if (props.game.game_name === "dancer"){
                runner= new DancerRunner(code, back_to_levels, next_level, gameSence, props.game.blocks, leftSideView, props.game.expected_solution,solve)
            }
            else if(props.game.game_name === "starsQuest"){
                runner = new StarsQuestRunner(code, back_to_levels, next_level, gameSence,props.game.data, props.game.blocks, leftSideView, props.game.expected_solution,solve, props.game.best_score)
            }
            // if (runner.runcode()){     
            //     await solve()
            // }
            runner.runcode()
        }
    }

    async function restart() {
        const my_game = await restart_game()
        await props.setGame(my_game)
    }

    
    const popoverHoverFocus = (
        <Popover id="popover-trigger-hover-focus" title="Popover bottom">
            <div><strong>Legend</strong></div>
            <img src={stars_information} className='star'></img>
            <img src={bombs_information} className='bombs'></img>



        </Popover>
      );

    return (
        <div id="gameBoard">
            {props.game !== null && <button className='btn btn-success' onClick={get_code}> Run game</button>}
            {props.game !== null && <button className='btn btn-danger' onClick={restart}> Restart level</button>}
           
            <Game game_name = {props.game.game_name} data = {props.game.data} level={props.game.level_number} expected_solution={props.game.expected_solution}  setGameSence = {setGameSence}/>
            {props.game !== null && props.game.game_name === 'starsQuest' &&
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="bottom"
                overlay={popoverHoverFocus}
                >
                <Button>Information</Button>
                </OverlayTrigger>
            }           

            {/* {compilationOpen && <CompilationErrorMessage text={text}/>} */}

        </div>
    );
}

export default GameBoard;