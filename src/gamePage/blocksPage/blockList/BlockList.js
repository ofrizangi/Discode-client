import * as Constants from '../../../constants';
import {Droppable } from 'react-beautiful-dnd';

import Block from './Block';
import React from 'react';
import BlockConst from './BlockConst';


function BlockList(props) {

    const blocks = props.blocks
    const max_row_number = props.max_row_number
    const commands = props.commands


    return (
        <>
            <Droppable droppableId={Constants.DROPPABLE_LIST_ID}>
                {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className='block-list'>
                        { commands.length - max_row_number === 0 ?
                            blocks.map((block, index) => {return <BlockConst key={block._id} index={index} block={block}></BlockConst>})
                            :
                            blocks.map((block, index) => {return <Block key={block._id} index={index} block={block}></Block>})
                        }
                        {provided.placeholder}
                    </div>)}
            </Droppable>

        </>
      );
}

export default BlockList;