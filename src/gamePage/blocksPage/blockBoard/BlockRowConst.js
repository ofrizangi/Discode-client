
import BlockBoard from './BlockBoard';
import BlockBoardConst from './BlockBoardConst';

import DescriptionConst from '../descriptions/DescriptionConst';


function BlockRowConst(props) {

    const row = props.row
    const block = row.block
    

    function get_inner_blocks(row_id, list_num){
        const index = props.commands.findIndex(element => element._id === row_id)
        return props.commands[index].inner_blocks[list_num]
    }

    return (
        <div id={row._id} className="block" style={{backgroundColor: block.color}}>
            {block.complex === 0 ?          
                <DescriptionConst block={block} row={row} list_num={0} commands={props.commands} setCommands={props.setCommands}></DescriptionConst> 
                :
                Array(block.complex).fill(null).map((list_value, list_num) => (
                    <div key={list_num}>
                        <DescriptionConst block={block} row={row} list_num={list_num} commands={props.commands} setCommands={props.setCommands}></DescriptionConst> 
                        { row._id !== null &&  
                            ((props.droppableBlock === row._id && props.droppableListNumber === list_num) ? <BlockBoard solution={get_inner_blocks(row._id, list_num)} list_num={list_num} setDroppableBlock={props.setDroppableBlock} row_id={row._id} droppableBlock = {props.droppableBlock} commands={props.commands} setCommands={props.setCommands} droppableListNumber={props.droppableListNumber} setDroppableListNumber={props.setDroppableListNumber} />
                                                    : <BlockBoardConst solution={get_inner_blocks(row._id, list_num)} setDroppableBlock={props.setDroppableBlock} droppableBlock = {props.droppableBlock} commands={props.commands} setCommands={props.setCommands} droppableListNumber={props.droppableListNumber} setDroppableListNumber={props.setDroppableListNumber} list_num={list_num} outer_block_id={row._id}/>) 
                        }
                    </div>
                ))
            }

        </div>
    );
}


export default BlockRowConst;