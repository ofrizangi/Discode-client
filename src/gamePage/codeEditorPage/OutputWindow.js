import {React, useState, useEffect} from "react";
import './outputPage.css'
import { CodeRunner } from "../../runSimulation/codeRunner/codeRunner";
import InsertArgsModal from "../../alerts/InsertArgsModal";
import {sloved_game, get_game_level_data, post_code_api, restart_game} from '../gamesAPI';
import {setLevel} from '../../levelsPage/LevelProvider'
import * as Constants from './../../constants';
import loading from './../../images/loading.gif'

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
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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

    async function restart() {
        const my_game = await restart_game()
        await props.setGame(my_game)
    }

    async function next_level(){
        setLevel(props.game.level_number+1)
        const levelData = await get_game_level_data()
        await props.setGame(levelData)
        setOutput([])
        setError({text : "", img: null})
        setArgs(levelData.function_arguments.length !== 0 ? [] : null)
        setRunCode(false)
        setSuccess(false)
        setFail(false)
        setFunctionCall(null)
    }

    async function run_code(){
        const code_runner = new CodeRunner(editor_code, expected_solution, args === null?[]:args)
        const correct = await code_runner.run_code()
        if(code_runner.error !== ""){
            if(code_runner.error.includes(Constants.INFINITE_CODE)){
                setError({text : code_runner.error, img: <img className="loading-gif" src={loading} alt="GIF"/>} )
                setIsButtonDisabled(true)
                setTimeout(() => {
                    setIsButtonDisabled(false)
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
        setFail(!correct)
        setSuccess(correct)
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
		<div>
			<button className='btn btn-success' disabled={isButtonDisabled} onClick={()=>{setRunCode(true)}}> Run code</button>
            <button className='btn btn-danger' onClick={restart}> Restart Level </button>

            <div className="mission-window">
				<h1 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
					Mission
				</h1>
                <div>{mission}</div>
			</div>


			<div className="console-window">
                <p> function call : {functionCall} </p>
				<h1 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
					Output
				</h1>
				{error!== "" ? <div className="error"> {error.text} {error.img}  </div> : <div> {output}</div>}

                {runCode && args !== null && <InsertArgsModal arguments_name={function_arguments} setArgs={setArgs} setRunCode={setRunCode}/>}

			</div>

            {success && 
                <div className="success-message"> 
                    <h1>Great job! </h1>
                    <button className='btn btn-primary' onClick={next_level}> Next level </button>
                </div>
            }

            {fail && 
                <div className="fail-message"> 
                    <h1> Output is not correct! try again... </h1>
                </div>
            }


		</div>
	);
};

export default OutputWindow;