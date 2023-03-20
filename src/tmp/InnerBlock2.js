import * as Constants from '../constants';

import { Draggable } from 'react-beautiful-dnd';

function InnerBlock2(props) {

    const row = props.row
    const block = row.block

    return (
        <div style={{backgroundColor: block.color,}}>  
            {block._id}
        </div>
    );
}


export default InnerBlock2;