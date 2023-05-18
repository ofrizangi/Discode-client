import {React, useState, useEffect} from "react";
import './outputPage.css'
import { CodeRunner } from "../../runSimulation/codeRunner/codeRunner";
import InsertArgsModal from "../../alerts/InsertArgsModal";
import {sloved_game, get_game_level_data} from '../gamesAPI';
import {setLevel} from '../../levelsPage/LevelProvider'


function OutputWindow(props) {

    const [output, setOutput] = useState([])
    const [error, setError] = useState("")
	const editor_code = props.code
    const expected_solution = props.game.expected_solution
    const function_arguments = props.game.function_arguments
    const mission = props.game.data
    const [args, setArgs] = useState(props.game.function_arguments.length !== 0 ? [] : null)
    const [runCode, setRunCode] = useState(false)
    const [success, setSuccess] = useState(false)
    const [fail, setFail] = useState(false)


    useEffect(() => {
        if(runCode){
            if(args === null || args.length !== 0){
                run_code()
            }
        }
    }, [runCode, args]);


    async function solve() {
        const my_game = await sloved_game()
        await props.setGame(my_game)
    }

    async function next_level(){
        setLevel(props.game.level_number+1)
        const levelData = await get_game_level_data()
        props.setGame(levelData)
        setOutput([])
        setError("")
        setArgs(props.game.function_arguments.length !== 0 ? [] : null)
        setRunCode(false)
        setSuccess(false)
        setFail(false)
    }

    async function run_code(){
        const code_runner = new CodeRunner(editor_code, expected_solution, args === null?[]:args)
        const correct = code_runner.run_code()
        if(code_runner.error !== ""){
            setError(code_runner.error)
            setOutput([])
        }
        else {
            setError("")
            setOutput(code_runner.output)
        }
        setFail(!correct)
        setSuccess(correct)

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
			<button className='btn btn-success' onClick={()=>{setRunCode(true)}}> Run code</button>


            <div className="mission-window">
				<h1 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
					Mission
				</h1>
                <div>{mission}</div>
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


			<div className="console-window">
				<h1 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
					Output
				</h1>
				{error!== "" ? <div className="error"> Error: {error}  </div> : <div> {output}</div>}

                {runCode && args !== null && <InsertArgsModal arguments_name={function_arguments} setArgs={setArgs}/>}

			</div>
		</div>
	);
};

export default OutputWindow;