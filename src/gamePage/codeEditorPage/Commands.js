import React, { useEffect, useState } from "react";

import './codeEditor.css'
import { DancerGenerator } from "../../runSimulation/codeGenerators/dancerGenerator";
import { StarsQuestGenerator } from "../../runSimulation/codeGenerators/starsQuestGenerator";


function CodeEditorPage(props) {

    const game_generators = {
        "dancer" : new DancerGenerator(),
        "starsQuest": new StarsQuestGenerator()
    }
    const generator = game_generators[props.gameLevel.game_name]
    const blocks = props.gameLevel.blocks
    // const [commandList, setCommandList] = useState([])


    // useEffect(() => {
    //     const list = []
    //     for(let i=0; i< blocks.length; i++){
    //         list.push(generator[blocks[i]._id])
    //     }
    //     setCommandList(list)
    // }, [generator, blocks]);


    return(
        <div> 
            Commands to use:
            {console.log(blocks, generator)}
            {blocks.map((block, index) => {  return <div key={index}> {block._id} </div>})}
        </div>
    )

}

export default CodeEditorPage;