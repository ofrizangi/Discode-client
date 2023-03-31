import * as Constants from '../../../constants';

import { Draggable } from 'react-beautiful-dnd';
import BlockBoardConst from './BlockBoardConst';

import { getArgument, getDescriptionList, getArgumentIndex } from '../arguments/argumentsProvider';


function BlockRow(props) {

    const row = props.row
    const block = row.block

    const desctiption_list = getDescriptionList(block.description)
    
    function set_outer_block(event){
        const clicked_element = event.target
        const clicked_element_id = clicked_element.getAttribute("id")
        if(clicked_element_id !== Constants.ARGUMENTS_IDENTIFIER){
            if(block.complex){
                props.setDroppableBlock(row._id)
            }      
        }  
    }

    function get_inner_blocks(row_id){
        const index = props.commands.findIndex(element => element._id === row_id)
        return props.commands[index].inner_blocks
    }

    return (
        <>
            <Draggable draggableId={Constants.DRAGGABLE_ROW_ID + props.index} index={props.index} >
            {(provided, snapshot) => (
                <div id={row._id} className="block" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} 
                    style={{ ...provided.draggableProps.style, backgroundColor: block.color,}} onClick={set_outer_block}>
                    {/* {console.log(block._id)} */}
                    {desctiption_list.map((item, index) => { return item !== Constants.ARGUMENTS_IDENTIFIER ? 
                                                        <span key={index}> {item} </span> : 
                                                        (<span key={index}> {getArgument(block.arguments_type, getArgumentIndex(index, desctiption_list), row, props.commands, props.setCommands)} </span> )})}
                    {block.complex && <BlockBoardConst solution={get_inner_blocks(row._id)} setDroppableBlock={props.setDroppableBlock} droppableBlock={props.droppableBlock} commands={props.commands} setCommands={props.setCommands}/>}

                </div>
            )}
            </Draggable>
        </>
    );
}


export default BlockRow;