

import * as Constants from '../../constants';

import { translate_blocks } from '../../runSimulation/CodeCreator';
import Game from './Game';
import {React,useState} from 'react';

import {sloved_game, restart_game} from '../gamesAPI';
import {setLevel} from '../../levelsPage/LevelProvider'

import CompilationErrorMessage from '../../alerts/CompilationErrorMessage';
import { useNavigate } from 'react-router-dom'
import { DancerRunner } from '../../runSimulation/codeRunner/daceRunner';
import { StarsQuestRunner } from '../../runSimulation/codeRunner/starsQuestRunner';


function GameBoard(props) {


    // const [compilationOpen, setCompilationOpen] = useState(false)
    const [text, setText] = useState("")
    const [gameSence, setGameSence] = useState()

    const navigate = useNavigate();


    async function solve() {
        const my_game = await sloved_game()
        await props.setGame(my_game)
    }

    async function back_to_levels(){
        navigate('/levels')
    }

    async function next_level(){
        setLevel(props.game.level_number+1)
        navigate(0)
        //navigate('/game')
    }


    async function get_code(){
        const code = await translate_blocks()
        setText(code)
        if(code.includes(Constants.COMPILATION_ERROR)){
            alert(code)
        }
        else {
            var runner;
            if (props.game.game_name === "dancer"){
                runner= new DancerRunner(code, props.game.expected_solution, back_to_levels, next_level, gameSence)

            }
            else if(props.game.game_name === "starsQuest"){
                runner = new StarsQuestRunner(code,props.game.expected_solution, back_to_levels, next_level, gameSence)
            }
            console.log(runner)
            if(runner.runcode()){
                            
                if(!code.includes(Constants.COMPILATION_ERROR)){

                    await solve()
                }
            }
        }
    }

    async function restart() {
        const my_game = await restart_game()
        await props.setGame(my_game)
    }

    return (
        <div id="gameBoard">
            <p> Game Board </p>
            <Game game_name = {props.game.game_name} data = {props.game.data} setGameSence = {setGameSence}/>
            {props.game !== null && <button className='btn btn-success' onClick={get_code}> Run game</button>}
            {props.game !== null && <button className='btn btn-danger' onClick={restart}> Restart level</button>}

            {/* {compilationOpen && <CompilationErrorMessage text={text}/>} */}

        </div>
    );
}

export default GameBoard;