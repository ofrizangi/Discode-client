import * as Constants from '../../../constants';

import { Draggable } from 'react-beautiful-dnd';


function Block(props) {

    const block = props.block

    return (
        <>
        <Draggable draggableId={Constants.DRAGGABLE_BLOCK_ID + props.index} index={props.index}>
            {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} 
                    style={{ ...provided.draggableProps.style, backgroundColor: block.color,}}>
                    {block._id}
                </div>
            )}
        </Draggable>
        </>
    );
}


export default Block;