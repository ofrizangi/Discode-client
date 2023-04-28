import * as Constants from '../../../constants';
import './blockBoard.css'
import { Droppable } from 'react-beautiful-dnd';
import BlockRow from './BlockRow';
import React from 'react';

import {getHandeledClick, setHandeledClick} from './OnClickInfo'

function BlockBoard(props) {

    // solution is only indeces
    const solution = props.solution

    function get_solution(){
        var my_solution = []
        for(let i=0;i<solution.length; i++){
            my_solution[i] = props.commands.find(command => command._id === solution[i])
        }
        return my_solution
    }


    function handle_on_click(event){
        if(getHandeledClick() === false) {
            setHandeledClick()
        }
    }

    return (
        <div className="board clickable-board" onClick={handle_on_click}>
            {/* {console.log("current solution", solution, get_solution())} */}
                <Droppable droppableId={Constants.DROPPABLE_BOARD_ID + props.row_id + props.list_num} >
                    {(provided, snapshot) => (
                        <div  ref={provided.innerRef} {...provided.droppableProps}>
                            {get_solution().map((row, index) => (
                                <BlockRow key={index} row={row} index={index} id={props.id} setDroppableBlock={props.setDroppableBlock} droppableBlock = {props.droppableBlock} commands={props.commands} setCommands={props.setCommands} droppableListNumber={props.droppableListNumber} setDroppableListNumber={props.setDroppableListNumber}> </BlockRow>
                            ))}
                            {provided.placeholder}
                        </div>)}
                </Droppable>
        </div>
      );
}

export default BlockBoard;