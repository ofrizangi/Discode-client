import * as Constants from '../constants';

import { Draggable } from 'react-beautiful-dnd';

function InnerBlock(props) {

    const row = props.row
    const block = row.block

    return (
        <>  
            {console.log(row)}
            <Draggable draggableId={Constants.DRAGGABLE_ROW_ID + row._id + "-" + props.index} index={props.index}>
                {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} 
                        style={{ ...provided.draggableProps.style, backgroundColor: block.color,}}>
                        {block._id}
                        {/* {block.complex && <InnerBlocks row={row}> </InnerBlocks>} */}
                    </div>
                )}
            </Draggable>
        </>
    );
}


export default InnerBlock;