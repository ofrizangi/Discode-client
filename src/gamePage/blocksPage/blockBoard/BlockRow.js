import * as Constants from '../../../constants';

import { Draggable } from 'react-beautiful-dnd';

function BlockRow(props) {

    const block = props.row.block

    return (
        <>        
            <Draggable draggableId={Constants.DRAGGABLE_ROW_ID + props.index} index={props.index}>
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


export default BlockRow;