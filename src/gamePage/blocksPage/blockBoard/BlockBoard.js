import * as Constants from '../../../constants';
import './blockBoard.css'
import { Droppable } from 'react-beautiful-dnd';
import BlockRow from './BlockRow';


function BlockBoard(props) {

    const solution = props.solution

    return (
        <div className="board">
            {console.log("current solution", solution)}
                <p>Block Board</p>
                <Droppable droppableId={Constants.DROPPABLE_BOARD_ID}>
                    {(provided, snapshot) => (
                        <div  ref={provided.innerRef} {...provided.droppableProps}>
                            {solution.map((row, index) => (
                                <BlockRow key={index} row={row} index={index} id={index}> </BlockRow>
                            ))}
                            {provided.placeholder}
                        </div>)}
                </Droppable>
        </div>
      );
}

export default BlockBoard;