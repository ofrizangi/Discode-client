import * as Constants from '../../../constants';
import {Droppable } from 'react-beautiful-dnd';


import Block from './Block';
import React from 'react';


function BlockList(props) {

    const blocks = props.blocks

    return (
        <>
            <p>Block List</p>
                <Droppable droppableId={Constants.DROPPABLE_LIST_ID}>
                    {(provided, snapshot) => (
                        <div  ref={provided.innerRef} {...provided.droppableProps}>
                            {blocks.map((block, index) => {return <Block key={block._id} index={index} block={block} max_number_of_rows={props.max_number_of_rows} commands={props.commands}></Block>})}
                            {provided.placeholder}
                        </div>)}
                </Droppable>

        </>
      );
}

export default BlockList;