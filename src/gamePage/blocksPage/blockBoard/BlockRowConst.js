
import BlockBoard from './BlockBoard';
import BlockBoardConst from './BlockBoardConst';

import * as Constants from '../../../constants';

import { getConstArgument, getDescriptionList, getArgumentIndex } from '../arguments/argumentsProvider';

function BlockRowConst(props) {

    const row = props.row
    const block = row.block
    
    const desctiption_list = getDescriptionList(block.description)

    function set_outer_block(event){
        const clicked_element = event.target
        const clicked_element_id = clicked_element.getAttribute("id")
        console.log("clicked element" , clicked_element_id)
        if(clicked_element_id === row._id || clicked_element === null){
            props.setDroppableBlock(row.outer_block)
        }
    }

    function get_inner_blocks(row_id){
        const index = props.commands.findIndex(element => element._id === row_id)
        return props.commands[index].inner_blocks
    }


    return (
        <div id={row._id} className="block" style={{backgroundColor: block.color}} onClick={set_outer_block}>  
            {desctiption_list.map((item, index) => { return item !== Constants.ARGUMENTS_IDENTIFIER ? 
                                                <span key={index}> {item} </span> : 
                                                (<span key={index}> {getConstArgument(block.arguments_type, getArgumentIndex(index, desctiption_list), row)} </span> )})}
            {/* only if the block is complex and row_id is not null we will check the if-else condition */}
            {(block.complex && row._id !== null) && 
                (props.droppableBlock === row._id ? <BlockBoard solution={get_inner_blocks(row._id)} setDroppableBlock={props.setDroppableBlock} row_id={row._id} droppableBlock = {props.droppableBlock} commands={props.commands} setCommands={props.setCommands}/> 
                                                                : <BlockBoardConst solution={get_inner_blocks(row._id)} setDroppableBlock={props.setDroppableBlock} droppableBlock = {props.droppableBlock} commands={props.commands} setCommands={props.setCommands}/>)}
        </div>
    );
}


export default BlockRowConst;