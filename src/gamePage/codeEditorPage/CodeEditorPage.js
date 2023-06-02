import React, { useEffect } from "react";

import './codeEditor.css'
import CodeEditorWindow from "./CodeEditorWindow";
import { rec_translate_blocks } from "../../runSimulation/CodeCreator";
import { DancerGenerator } from "../../runSimulation/codeGenerators/dancerGenerator";
import { StarsQuestGenerator } from "../../runSimulation/codeGenerators/starsQuestGenerator";

import { restart_game } from '../gamesAPI';

import restart_img from './../../images/reloading.png'


function CodeEditorPage(props) {

    const code = props.code
    const setCode = props.setCode
    const blocks = props.gameLevel.blocks
    const game_generators = {
        "dancer" : new DancerGenerator(),
        "starsQuest": new StarsQuestGenerator()
    }
    const generator = game_generators[props.gameLevel.game_name]
    const commands = props.commands
    const solution = props.solution

    useEffect(() => {
        if(code === ""){
            setCode(create_function_comment() + `function ${get_main_function_call()} {\n\n}`)
        }
    }, [code]);


    function get_main_function_call(){
        const game_blocks = blocks.filter(element => element.is_game_block)
        const game_blocks_id = game_blocks.map(obj => obj._id)
        return "main("+ game_blocks_id.join(',') + ")"
    }

    function create_function_comment(){
        const game_blocks = blocks.filter(element => element.is_game_block)
        const game_blocks_id = game_blocks.map(obj => obj._id)
        const game_blocks_arguments = game_blocks.map(obj => obj.arguments_type)
        const joined_arguments = []

        for(let line=0; line<game_blocks_arguments.length; line++){
            for(let i=0; i<game_blocks_arguments[line].length; i++){

                joined_arguments.push(game_blocks_arguments[line][i].map(item =>  { try{
                        return item.join("'\\'")}
                        catch(e){
                            return "Number"
                        }
                }))
            }
        }
        for(let id = 0; id< game_blocks_id.length; id++){
            const first_char =  joined_arguments[id].length === 0 || joined_arguments[id][0] === "Number" ? "" : "'"
            console.log( joined_arguments[id][joined_arguments.length - 1])
            const second_char =  joined_arguments[id].length === 0 || joined_arguments[id][joined_arguments[id].length - 1] === "Number" ? "" : "'"
            game_blocks_id[id] = `${game_blocks_id[id]}(${first_char}${joined_arguments[id].join(" , ")}${second_char})`
        }
        return "/* game function calls:\n * "+ game_blocks_id.join('\n * ') + "\n*/\n\n"
    }


    function generate_code(){
        setCode(create_function_comment() + `function ${get_main_function_call()} {\n${rec_translate_blocks(commands, solution, generator, "\t")}\n}`)
    }

    async function restart() {
        const my_game = await restart_game()
        await props.setGame(my_game)
    }


    return(
        <div>
            <div className='upper-row'>
                <button className='restart-blocks-button pa' onClick={restart}> <img src={restart_img} alt="error"/> </button>
                <button className='btn btn-primary generate-button' onClick={generate_code}> generate blocks to code</button>             
            </div> 
            <CodeEditorWindow code={code} setCode={setCode}> </CodeEditorWindow>
        </div>
    )

}

export default CodeEditorPage;