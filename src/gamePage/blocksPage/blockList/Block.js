import * as Constants from '../../../constants';

import { Draggable } from 'react-beautiful-dnd';
import React from 'react';

import { getConstArgument, getDescriptionList, getArgumentIndex } from '../arguments/argumentsProvider';

function Block(props) {

    const block = props.block

    const desctiption_list = getDescriptionList(block.description)

    return (
        <>
        <Draggable draggableId={Constants.DRAGGABLE_BLOCK_ID + props.index} index={props.index} >
            {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} 
                    style={{ ...provided.draggableProps.style, backgroundColor: block.color,}} className="block">
                    {desctiption_list.map((item, index) => { return item !== Constants.ARGUMENTS_IDENTIFIER ? 
                                                    <span key={index}> {item} </span> : 
                                                    (<span key={index}> {getConstArgument(block.arguments_type, getArgumentIndex(index, desctiption_list))} </span> )})}
                </div>
            )}
        </Draggable>
        </>
    );
}


export default Block;