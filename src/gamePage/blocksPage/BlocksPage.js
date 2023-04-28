import * as Constants from '../../constants';

import { useState, useEffect } from 'react';

import BlockList from './blockList/BlockList';
import BlockBoard from './blockBoard/BlockBoard';
import BlockBoardConst from './blockBoard/BlockBoardConst';
import {swap_command_api, post_command, delete_command_api, post_inner_command, 
    delete_inner_command_api, swap_inner_command_api, get_level_commands } from '../gamesAPI';

import { DragDropContext } from 'react-beautiful-dnd';
import React from 'react';

function BlocksPage(props) {

    const blocks = props.gameLevel.blocks
    const max_row_number = props.gameLevel.max_number_of_rows
    const [solution , setSolution ] = useState(props.gameLevel.solution)
    // console.log("solsolsol" , solution)
    const [commands , setCommands ] = useState(null)

    // droppableBlock is the current outer block we are putting inside blocks
    const [droppableBlock , setDroppableBlock] = useState(null)
    const [droppableListNumber , setDroppableListNumber] = useState(null)



    useEffect(() => {
        async function set_commands(){
            const level_commands = await get_level_commands();
            setCommands(level_commands)
        }
        set_commands()
    }, []);
    
    useEffect(() => {
        setSolution(props.gameLevel.solution)
    }, [props.gameLevel.solution]);


    function create_arguments_array(block){
        var argumnets_array = [Array(block.arguments_type.length).fill(null)]
        for(let i=1; i <block.complex; i++ ){
            argumnets_array.push(Array(block.arguments_type.length).fill(null))
        }
        return argumnets_array
    }

    /*
    functions handling adding commands
    */
    async function add_new_command(src_index ,dest_index){
        const id = null
        const block = blocks.at(src_index)
        commands.push({"_id" : id, "block": block, "arguments": create_arguments_array(block), "outer_block" : droppableBlock, "outer_block_list_number":null , "inner_blocks" : Array(block.complex).fill([])} )
        solution.splice(dest_index, 0, id)
        setSolution(solution)
        setCommands(commands)

        const new_command = await post_command(blocks.at(src_index), dest_index)
        solution[dest_index] = new_command._id
        setSolution(solution)

        commands[commands.length - 1]._id = new_command._id
        commands[commands.length - 1].inner_blocks = new_command.inner_blocks
        setCommands(commands)
    }

    async function add_new_inner_command(outer_command_index , list_number, src_index , dest_index){
        const id = null
        const block = blocks.at(src_index)
        commands.push({"_id" : id, "block": block, "arguments": create_arguments_array(block), "outer_block" : droppableBlock, "outer_block_list_number":list_number, "inner_blocks" : Array(block.complex).fill([])} )
        commands[outer_command_index].inner_blocks[list_number].splice(dest_index, 0, id)
        setCommands(commands)

        const new_command = await post_inner_command(blocks.at(src_index), dest_index, droppableBlock, list_number)
        commands[outer_command_index].inner_blocks[list_number][dest_index] = new_command._id
        commands[commands.length - 1]._id = new_command._id
        commands[commands.length - 1].inner_blocks = new_command.inner_blocks
        setCommands(commands)
    }

    /*
    functions handling deleting commands
    */
    //helper function to remove all the commands inside me
    function delete_inner_commands(deleted_command_id){
        const index = commands.findIndex(element => element._id === deleted_command_id)
        const inner_commands = commands[index].inner_blocks
        commands.splice(index, 1)
        for(let i=0; i < inner_commands.length; i++ ){
            for(let j=0; j<inner_commands[i].length; j++){
                delete_inner_commands(inner_commands[i][j])
            }
        }
    }

    async function remove_inner_commands(outer_command_index , list_number, src_index){
        const deleted_command = commands[outer_command_index].inner_blocks[list_number].splice(src_index, 1)[0]
        delete_inner_commands(deleted_command)
        setCommands(commands)
        console.log(commands)
        await delete_inner_command_api(src_index, droppableBlock, list_number)
    }

    async function remove_commands(src_index){
        const deleted_command = solution.splice(src_index, 1)[0]
        delete_inner_commands(deleted_command)
        setCommands(commands)
        setSolution(solution)
        await delete_command_api(src_index)
    }


    /* functions handling swaping commands*/
    async function swap_inner_commands(outer_command_index , list_number, src_index , dest_index){
        commands[outer_command_index].inner_blocks[list_number].splice(dest_index, 0, commands[outer_command_index].inner_blocks[list_number].splice(src_index, 1)[0]) // second_argument => number of element to remove, third_argument => elements to add, returns the removed items
        setCommands(commands)
        await swap_inner_command_api(src_index, dest_index, droppableBlock, list_number)
    }

    async function swap_commands(src_index , dest_index){
        await solution.splice(dest_index, 0, solution.splice(src_index, 1)[0]) // second_argument => number of element to remove, third_argument => elements to add, returns the removed items
        setSolution(solution)
        await swap_command_api(src_index, dest_index)
    }


    async function dragEndHandler(draggable_block){

        if(draggable_block.source.droppableId.includes(Constants.DROPPABLE_LIST_ID) && draggable_block.destination.droppableId.includes(Constants.DROPPABLE_BOARD_ID)){
            if(commands.length >= max_row_number) {
                alert("to many blocks")
                return
            }
        }

        const src_index = draggable_block.source.index
        const dest_index = draggable_block.destination === null ? null : draggable_block.destination.index

        // if droppable block isn't null then we are handling an inner command
        if(droppableBlock !== null){
            const outer_command_index = commands.findIndex(element => element._id === droppableBlock)

            if (dest_index === null) {
                if (draggable_block.draggableId.includes(Constants.DRAGGABLE_ROW_ID)) {
                    const src_string = draggable_block.source.droppableId
                    const list_number = Number(src_string.charAt(src_string.length -1))
                    await remove_inner_commands(outer_command_index, list_number, src_index)
                }
                return
            }   
            
            const destination_string = draggable_block.destination.droppableId
            const list_number = Number(destination_string.charAt(destination_string.length -1))
            if (draggable_block.draggableId.includes(Constants.DRAGGABLE_BLOCK_ID) ){
                // checking if we dragged the block to another list and not the same one
                if(draggable_block.source.droppableId !== draggable_block.destination.droppableId) {
                    await add_new_inner_command(outer_command_index, list_number, src_index, dest_index)
                }
            }
            else {
                await swap_inner_commands(outer_command_index, list_number, src_index, dest_index)
            }
        }
        // handling outer command
        else {
            // if we dragged a block outside of the board we want to delete it
            if (draggable_block.destination === null) {
                if (draggable_block.draggableId.includes(Constants.DRAGGABLE_ROW_ID)) {
                    await remove_commands(src_index)
                }
            }
            // if the blocks is from block_list
            else if (draggable_block.draggableId.includes(Constants.DRAGGABLE_BLOCK_ID) ){
                // checking if we dragged the block to another list and not the same one
                if(draggable_block.source.droppableId !== draggable_block.destination.droppableId) {
                    await add_new_command(src_index, dest_index)
                }
            }
            // swapping command
            else {
                await swap_commands(src_index, dest_index)
            }
        }

    }

    
    return (
        <div>
            {commands !== null &&
            <DragDropContext onDragEnd={(param) => dragEndHandler(param)} >
                <div className="row d-none d-md-flex">
                    <div className="col-5"> <BlockList blocks={blocks}/> </div>
                    {droppableBlock === null ? <div className="col-7"> <BlockBoard solution={solution} list_num={null} setDroppableBlock={setDroppableBlock} row_id={null} droppableListNumber={droppableListNumber} setDroppableListNumber={setDroppableListNumber} droppableBlock = {droppableBlock} commands={commands} setCommands={setCommands}/> </div> : 
                                                <div className="col-7"> <BlockBoardConst solution={solution} setDroppableBlock={setDroppableBlock} droppableBlock = {droppableBlock} commands={commands} setCommands={setCommands} droppableListNumber={droppableListNumber} setDroppableListNumber={setDroppableListNumber} list_num={null} outer_block_id={null}/> </div>}
                </div>
            </DragDropContext>
            }
        </div>
      );
}
  
export default BlocksPage;
