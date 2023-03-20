import * as Constants from '../constants';
import './../blockBoard.css'
import { Droppable } from 'react-beautiful-dnd';
import InnerBlock2 from './InnerBlock2';
import { useState } from 'react';


function InnerBlocks2(props) {

    const row = props.row

    // console.log("row", row.inner_blocks)

    // const [innerBlocks, setInnerBlocks] = useState([{_id: '640b06048a3f8084cd597442', block: {_id : "move", color:"yellow", complex:"false"}, arguments: [], level: '640af93d8a3f8084cd5976b2', inner_blocks: []}])

    const [innerBlocks, setInnerBlocks] = useState(row.inner_blocks)


    // console.log("state", innerBlocks)

    function onDropHandler(event){
        console.log("innnnnnnnnnnnnnnnnnnn")
        const block = event.dataTransfer.getData("block")
        console.log(block)
    }

    function onDragOver(event){
        event.preventDefault()
    }

    return (
        <div className="mini-board">

            {innerBlocks.map((row, index) => (
                <InnerBlock2 key={index} row={row} index={index} > </InnerBlock2>
            ))}
  
        </div>
      );
}

export default InnerBlocks2;