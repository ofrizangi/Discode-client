import * as Constants from '../../constants';

import { useState, useEffect } from 'react';

import BlockList from './blockList/BlockList';
import BlockBoard from './blockBoard/BlockBoard';
import { get_game_blocks, swap_command, post_command, delete_command, get_game_level_data } from '../gamesAPI';

import { DragDropContext } from 'react-beautiful-dnd';


function BlockPage(props) {

    const [blocks, setBlocks] = useState([])
    const [solution , setSolution ] = useState(props.solution)

    useEffect(() => {
        async function set_game_blocks(){
                const game_blocks = await get_game_blocks();
                setBlocks(game_blocks)
            }
            set_game_blocks()
    }, []);


    async function dragEndHandler(draggable_block){
        console.log(draggable_block)

        const src_index = draggable_block.source.index

        // if we dragged a block outside of the board we want to delete it
        if (draggable_block.destination === null) {
            if (draggable_block.draggableId.includes(Constants.DRAGGABLE_ROW_ID)) {
                solution.splice(src_index, 1)
                setSolution(solution)
                await delete_command(src_index)
            }
        }
        else {
            const dest_index = draggable_block.destination.index
            // if the blocks is from block_list
            if (draggable_block.draggableId.includes(Constants.DRAGGABLE_BLOCK_ID) ){
                // checking if we dragged the block to another list and not the same one
                if(draggable_block.source.droppableId !== draggable_block.destination.droppableId) {
                    solution.splice(dest_index, 0, {"block": blocks.at(src_index), "arguments": []})
                    setSolution(solution)
                    await post_command(blocks.at(src_index), dest_index)
                }
            }
            // swapping command
            else {
                await solution.splice(dest_index, 0, solution.splice(src_index, 1)[0]) // second_argument => number of element to remove, third_argument => elements to add, returns the removed items
                setSolution(solution)
                await swap_command(src_index, dest_index)
            }
        }
        // setting updated solution from DB
        const my_game = await get_game_level_data()
        setSolution(my_game.solution)
    }
    

    return (
        <div>
            <DragDropContext onDragEnd={(param) => dragEndHandler(param)}>
            <div className="row d-none d-md-flex">
                <div className="col-6"> <BlockList blocks={blocks}/> </div>
                <div className="col-6"> <BlockBoard solution={solution}/> </div>
            </div>
            </DragDropContext>
        </div>
      );
}
  
export default BlockPage;
