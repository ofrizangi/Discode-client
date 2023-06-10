import BlockRowConst from './BlockRowConst';
import {React} from 'react';

import {getHandeledClick, setHandeledClick} from './OnClickInfo'

function BlockBoardConst(props) {

    const solution = props.solution

    function get_solution(){
        var my_solution = []
        for(let i=0;i<solution.length; i++){
            my_solution[i] = props.commands.find(command => command._id === solution[i])
        }
        return my_solution
    }

    function set_droppable_block(event){
        if(getHandeledClick() === false) {
            setHandeledClick()
            props.setDroppableBlock(props.outer_block_id)
            props.setDroppableListNumber(props.list_num)
        }
    }

    return (
        <div className="board" onClick={set_droppable_block}>
                {solution !== null && get_solution().map((row, index) => (
                    <BlockRowConst key={index} row={row} index={index} setDroppableBlock={props.setDroppableBlock} droppableBlock = {props.droppableBlock} commands={props.commands} setCommands={props.setCommands} droppableListNumber={props.droppableListNumber} setDroppableListNumber={props.setDroppableListNumber}> </BlockRowConst>
                ))}
        </div>
      );
}

export default BlockBoardConst;