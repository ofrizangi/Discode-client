import React, { useEffect } from "react";

import './codeEditor.css'
import CodeEditorWindow from "./CodeEditorWindow";
import { rec_translate_blocks } from "../../runSimulation/CodeCreator";
import { DancerGenerator } from "../../runSimulation/codeGenerators/dancerGenerator";
import { StarsQuestGenerator } from "../../runSimulation/codeGenerators/starsQuestGenerator";

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
            setCode(`function ${get_main_function_call()} {\n\n}`)
        }
    }, [code]);


    function get_main_function_call(){
        const game_blocks = blocks.filter(element => element.is_game_block)
        const game_blocks_id = game_blocks.map(obj => obj._id)
        return "main("+ game_blocks_id.join(',') + ")"
    }


    function generate_code(){
        setCode(`function ${get_main_function_call()} {\n${rec_translate_blocks(commands, solution, generator, "\t")}\n}`)
    }


    return(
        <div>
            <CodeEditorWindow code={code} setCode={setCode}> </CodeEditorWindow>
            <button className='btn btn-success' onClick={generate_code}> generate blocks to code</button>             
        </div>
    )

}

export default CodeEditorPage;