import * as Constants from '../../constants';

import { useState, useEffect } from 'react';
import './blocks.css'

import BlockList from './blockList/BlockList';
import BlockBoard from './blockBoard/BlockBoard';
import BlockBoardConst from './blockBoard/BlockBoardConst';
import {swap_command_api, post_command, delete_command_api, post_inner_command, 
    delete_inner_command_api, swap_inner_command_api, restart_game } from '../gamesAPI';

import { DragDropContext } from 'react-beautiful-dnd';
import React from 'react';
import restart_img from './../../images/reloading.png'


function BlocksPage(props) {

    const blocks = props.gameLevel.blocks
    const max_row_number = props.gameLevel.max_number_of_rows
    const solution = props.solution
    const setSolution = props.setSolution
    const commands = props.commands
    const setCommands = props.setCommands
    const [lastId, setLastId] = useState(props.gameLevel.last_command_id)

    // droppableBlock is the current outer block we are putting inside blocks
    const [droppableBlock , setDroppableBlock] = useState(null)
    const [droppableListNumber , setDroppableListNumber] = useState(null)


    useEffect(() => {
        setLastId(props.gameLevel.last_command_id)
    }, [props.gameLevel.last_command_id]);

    function create_arguments_array(block){
        var argumnets_array = [Array(block.arguments_type[0].length).fill(null)]
        for(let i=1; i<block.complex; i++ ){
            argumnets_array.push(Array(block.arguments_type[i].length).fill(null))
        }
        return argumnets_array
    }

    /*
    functions handling adding commands
    */
    async function add_new_command(src_index ,dest_index){
        const id = lastId + 1
        const block = blocks.at(src_index)
        const new_commands = [...commands];
        new_commands.push({"_id" : id, "block": block, "arguments": create_arguments_array(block), "outer_block" : droppableBlock, "outer_block_list_number":null , "inner_blocks" :  []})
        for(let i=0; i< block.complex; i++){
            new_commands[new_commands.length-1].inner_blocks[i]= []
        }
        await solution.splice(dest_index, 0, id)
        await setCommands(new_commands)
        setLastId(id)

        await post_command(blocks.at(src_index), dest_index)
    }

    async function add_new_inner_command(outer_command_index , list_number, src_index , dest_index){
        const id = lastId + 1
        const block = blocks.at(src_index)
        const new_commands = [...commands];
        new_commands.push({"_id" : id, "block": block, "arguments": create_arguments_array(block), "outer_block" : droppableBlock, "outer_block_list_number":list_number, "inner_blocks" : []})
        for(let i=0; i< block.complex; i++){
            new_commands[new_commands.length-1].inner_blocks[i]= []
        }
        new_commands[outer_command_index].inner_blocks[list_number].splice(dest_index, 0, id)
        await setCommands(new_commands)
        setLastId(id)

        await post_inner_command(blocks.at(src_index), dest_index, droppableBlock, list_number)

    }

    /*
    functions handling deleting commands
    */
    //helper function to remove all the commands inside me
    function delete_inner_commands(deleted_command_id, commands){
        const index = commands.findIndex(element => element._id === deleted_command_id)
        const inner_commands = commands[index].inner_blocks
        commands.splice(index, 1)
        for(let i=0; i < inner_commands.length; i++ ){
            for(let j=0; j<inner_commands[i].length; j++){
                delete_inner_commands(inner_commands[i][j] ,commands)
            }
        }
        return commands
    }

    async function remove_inner_commands(outer_command_index , list_number, src_index){
        var new_commands = [...commands]
        const deleted_command = new_commands[outer_command_index].inner_blocks[list_number].splice(src_index, 1)[0]
        new_commands = await delete_inner_commands(deleted_command, new_commands)
        await setCommands(new_commands)
        await delete_inner_command_api(src_index, droppableBlock, list_number)
    }

    async function remove_commands(src_index){
        const new_solution = [...solution]
        const deleted_command = new_solution.splice(src_index, 1)[0]
        await setSolution(new_solution)
        const new_commands = delete_inner_commands(deleted_command, [...commands])
        setCommands(new_commands)
        await delete_command_api(src_index)
    }


    /* functions handling swaping commands*/
    async function swap_inner_commands(outer_command_index , list_number, src_index , dest_index) {
        const new_commands = [...commands]
        new_commands[outer_command_index].inner_blocks[list_number].splice(dest_index, 0, commands[outer_command_index].inner_blocks[list_number].splice(src_index, 1)[0]) // second_argument => number of element to remove, third_argument => elements to add, returns the removed items
        await setCommands([...new_commands])
        await swap_inner_command_api(src_index, dest_index, droppableBlock, list_number)
    }

    async function swap_commands(src_index , dest_index){
        const new_solution = [...solution]
        new_solution.splice(dest_index, 0, new_solution.splice(src_index, 1)[0]) // second_argument => number of element to remove, third_argument => elements to add, returns the removed items
        setSolution(new_solution)
        await swap_command_api(src_index, dest_index)
    }


    async function dragEndHandler(draggable_block){

        // if(draggable_block.source.droppableId.includes(Constants.DROPPABLE_LIST_ID) && draggable_block.destination.droppableId.includes(Constants.DROPPABLE_BOARD_ID)){
        //     if(commands.length >= max_row_number) {
        //         alert("to many blocks")
        //         return
        //     }
        // }

        const src_index = draggable_block.source.index
        const dest_index = draggable_block.destination === null ? null : draggable_block.destination.index

        // if droppable block isn't null then we are handling an inner command
        if(droppableBlock !== null) {
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


    async function restart() {
        await setSolution(null)
        const my_game = await restart_game()
        await props.setGame(my_game)
    }

    
    return (
        <div>
            <div className='upper-row'>
                <button className='restart-blocks-button' onClick={restart}> <img src={restart_img} alt="error"/> </button>
                <div className='blocks-left-capacity'> you have {max_row_number - commands.length} blocks left </div>
            </div>              

            
            <div > 
                <DragDropContext onDragEnd={(param) => dragEndHandler(param)} >
                    <div className="row d-none d-md-flex">
                        <div className="col-6"> <BlockList blocks={blocks} max_row_number={max_row_number} commands={commands}/> </div>
                        {
                        (droppableBlock === null ? <div className="col-6" > <BlockBoard solution={solution} list_num={null} setDroppableBlock={setDroppableBlock} row_id={null} droppableListNumber={droppableListNumber} setDroppableListNumber={setDroppableListNumber} droppableBlock = {droppableBlock} commands={commands} setCommands={setCommands}/> </div> : 
                                                    <div className="col-6"> <BlockBoardConst solution={solution} setDroppableBlock={setDroppableBlock} droppableBlock = {droppableBlock} commands={commands} setCommands={setCommands} droppableListNumber={droppableListNumber} setDroppableListNumber={setDroppableListNumber} list_num={null} outer_block_id={null}/> </div>)
                        }
                    </div>
                </DragDropContext>
            </div>
            
        </div>
      );
}
export default BlocksPage;
