import * as Constants from '../../../constants';

import { Draggable } from 'react-beautiful-dnd';
import BlockBoardConst from './BlockBoardConst';

import Description from '../descriptions/Description';


function BlockRow(props) {

    const row = props.row
    const block = row.block

    function get_inner_blocks(row_id, list_number){
        const index = props.commands.findIndex(element => element._id === row_id)
        return props.commands[index].inner_blocks[list_number]
    }

    return (
        <>
            <Draggable draggableId={Constants.DRAGGABLE_ROW_ID + props.index} index={props.index} >
            {(provided, snapshot) => (
                <div id={row._id} className="block" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} 
                    style={{ ...provided.draggableProps.style, backgroundColor: block.color,}}>

                    {block.complex === 0 ?                                  
                        <Description block={block} row={row} list_num={0} commands={props.commands} setCommands={props.setCommands}></Description> 
                        : 
                        Array(block.complex).fill(null).map((list_value, list_num) => (
                            <div key={list_num}>
                                <Description block={block} row={row} list_num={list_num} commands={props.commands} setCommands={props.setCommands}></Description> 
                                <BlockBoardConst solution={get_inner_blocks(row._id, list_num)} setDroppableBlock={props.setDroppableBlock} droppableBlock={props.droppableBlock} commands={props.commands} setCommands={props.setCommands} droppableListNumber={props.droppableListNumber} setDroppableListNumber={props.setDroppableListNumber}
                                                    list_num={list_num} outer_block_id={row._id}/>
                            </div>
                        ))
                    }
                </div>
            )}
            </Draggable>
        </>
    );
}


export default BlockRow;