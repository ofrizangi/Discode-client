import {React, useState, useEffect} from "react";
import './outputPage.css'
import { CodeRunner } from "../../runSimulation/codeRunner/codeRunner";
import InsertArgsModal from "../../alerts/InsertArgsModal";
import {sloved_game, get_game_level_data, post_code_api, restart_game} from '../gamesAPI';
import {setLevel} from '../../levelsPage/LevelProvider'
import * as Constants from './../../constants';

import loading from './../../images/loading.gif'
import play_img from './../../images/play-button.png'
import restart_img from './../../images/reloading.png'


function OutputWindow(props) {

    const [output, setOutput] = useState([])
    const [error, setError] = useState({text : "", img: null})
	const editor_code = props.code
    const expected_solution = props.game.expected_solution
    const function_arguments = props.game.function_arguments
    const mission = props.game.data
    const [args, setArgs] = useState(props.game.function_arguments.length !== 0 ? [] : null)
    const [runCode, setRunCode] = useState(false)
    const [success, setSuccess] = useState(false)
    const [fail, setFail] = useState(false)
    const [functionCall, setFunctionCall] = useState("")

    const [runButtonDisabled, setRunButtonDisabled] = useState(false)
    const [nextButtonDisabled, setNextButtonDisabled] = useState(true)


    useEffect(() => {
        if(runCode){
            if(args === null || args.length !== 0){
                run_code()
            }
        }
    }, [runCode, args]);


    async function solve() {
        await post_code_api(editor_code)
        const my_game = await sloved_game()
        await props.setGame(my_game)
    }

    function setter(levelData){
        setOutput([])
        setError({text : "", img: null})
        setArgs(levelData.function_arguments.length !== 0 ? [] : null)
        setRunCode(false)
        setSuccess(false)
        setFail(false)
        setFunctionCall(null)
        setNextButtonDisabled(true)
    }

    async function restart() {
        await props.setCommands(null)
        const my_game = await restart_game()
        await props.setGame(my_game)
        setter(my_game)
    }

    async function next_level(){
        await props.setCommands(null)
        setLevel(props.game.level_number+1)
        const levelData = await get_game_level_data()
        await props.setGame(levelData)
        setter(levelData)
    }

    async function run_code(){
        const code_runner = new CodeRunner(editor_code, expected_solution, args === null?[]:args)
        const correct = await code_runner.run_code()
        if(code_runner.error !== ""){
            if(code_runner.error.includes(Constants.INFINITE_CODE)){
                setError({text : code_runner.error, img: <img className="loading-gif" src={loading} alt="GIF"/>} )
                setRunButtonDisabled(true)
                setTimeout(() => {
                    setRunButtonDisabled(false)
                    setError({text : code_runner.error, img: null} )
                }, 1000*30);
            }
            else {
                setError({text : code_runner.error, img: null} )
            }
            setOutput([])
        }
        else {
            setError({text : "", img: null})
            setOutput(code_runner.output)
        }
        if(correct !== undefined){
            setFail(!correct)
            setSuccess(correct)
            setNextButtonDisabled(!correct)
        } else {
            setFail(false)
            setSuccess(false)
            setNextButtonDisabled(false)
        }

        setFunctionCall(code_runner.function_call)

        if(correct){
            await solve()
        }
        setRunCode(false)
        if(function_arguments.length !== 0){
            setArgs([])
        }

    }


	return (
		<div className="output-window-container">

            <div className="mission-window">
				<h2> Mission </h2>
                <div>{mission}</div>
			</div>

            <div className="upper-terminal">
                <button className="game-button" disabled={runButtonDisabled} onClick={()=>{setRunCode(true)}}> <img src={play_img} alt="error"/></button>
                <button className='game-button' onClick={restart}> <img src={restart_img} alt="error"/> </button>
                <div className='function-call'> function call : {functionCall} </div>
            </div>

            <div className="console-window">
                    <h2> Output </h2>
                    {error.text !== "" ? <div> {error.text} {error.img}  </div> : <div> {output}</div>}

                    {runCode && args !== null && <InsertArgsModal arguments_name={function_arguments} setArgs={setArgs} setRunCode={setRunCode}/>}
			</div>
  
            <div className="output-message"> 
                {success && <h2 className="success-message">Great job! </h2> }

                {fail &&  <h2 className="fail-message"> Wrong output! Try again </h2> }
            </div>

            <button className='btn btn-primary next-button' disabled={nextButtonDisabled} onClick={next_level}> Next level </button>


		</div>
	);
};

export default OutputWindow;