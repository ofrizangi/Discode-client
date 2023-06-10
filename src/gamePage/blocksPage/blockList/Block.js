import * as Constants from '../../../constants';

import { Draggable } from 'react-beautiful-dnd';
import React from 'react';

import DescriptionConst from '../descriptions/DescriptionConst';

function Block(props) {

    const block = props.block

    // const desctiption_list = getDescriptionList(block.description[0])

    return (
        <>
        <Draggable draggableId={Constants.DRAGGABLE_BLOCK_ID + props.index} index={props.index} >
            {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} 
                    style={{ ...provided.draggableProps.style, backgroundColor: block.color,}} className="block">

                        {block.complex === 0 ?          
                            <DescriptionConst block={block} list_num={0}></DescriptionConst> 
                         :
                            Array(block.complex).fill(null).map((list_value, list_num) => (
                            <div key={list_num}>
                                <div className='description'><DescriptionConst block={block} list_num={list_num}></DescriptionConst> </div>
                                <div className='board'> </div>
                            </div>
                       )) }
                </div>
            )}
        </Draggable>
        </>
    );
}


export default Block;