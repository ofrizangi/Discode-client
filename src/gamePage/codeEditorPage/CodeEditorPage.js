import React, { useEffect } from "react";

import './codeEditor.css'
import Commands from './Commands'
import CodeEditorWindow from "./CodeEditorWindow";
import { rec_translate_blocks } from "../../runSimulation/CodeCreator";
import { DancerGenerator } from "../../runSimulation/codeGenerators/dancerGenerator";
import { StarsQuestGenerator } from "../../runSimulation/codeGenerators/starsQuestGenerator";

function CodeEditorPage(props) {

    const code = props.code
    const setCode = props.setCode
    const gameLevel = props.gameLevel
    const game_generators = {
        "dancer" : new DancerGenerator(),
        "starsQuest": new StarsQuestGenerator()
    }
    const generator = game_generators[props.gameLevel.game_name]
    const commands = props.commands
    const solution = props.solution



    function generate_code(){
        setCode(rec_translate_blocks(commands, solution, generator, ""))
    }



    return(
        <div className="row d-none d-md-flex">
            <div className="col-3"> <Commands gameLevel={gameLevel}/> </div>
            <div className="col-9">
                <CodeEditorWindow code={code} setCode={setCode}> </CodeEditorWindow>
                <button className='btn btn-success' onClick={generate_code}> generate blocks to code</button>
            </div>
             
        </div>
    )

}

export default CodeEditorPage;