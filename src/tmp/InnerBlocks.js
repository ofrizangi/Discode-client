import * as Constants from '../constants';
import './../blockBoard.css'
import { Droppable } from 'react-beautiful-dnd';
import InnerBlock from './InnerBlock';
import { useState } from 'react';


function InnerBlocks(props) {

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
                <Droppable droppableId={Constants.DROPPABLE_INNER_BOARD_ID + "_" + row._id}>
                    {(provided, snapshot) => (
                         <div  ref={provided.innerRef} {...provided.droppableProps}>
                            {innerBlocks.map((row, index) => (
                                    <InnerBlock key={index} row={row} index={index} id={index}> </InnerBlock>
                                ))}
                            {provided.placeholder}
                        </div>)}
                </Droppable>
        </div>
      );
}

export default InnerBlocks;