import * as Constants from '../constants';

import { getLevel } from '../levelsPage/LevelProvider';
import { getToken } from '../userManagment/authorization';
import { getGame } from '../mainPage/GameProvider';



const gamesAPI = () => {

    async function get_game_level_data(){
        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + getToken() },
        };
        const response = await fetch(`${Constants.SERVER_API}/${getGame()}/levels/getOne/${getLevel()}`, requestOptions)
        if (response.ok) {
            return await response.json();
        }
    }

    async function get_level_commands(){
        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + getToken() },
        };
        const response = await fetch(`${Constants.SERVER_API}/${getGame()}/levels/${getLevel()}/commands/getAll`, requestOptions)
        if (response.ok) {
            return await response.json();
        }
    }

    async function get_game_blocks(){
        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + getToken() },
        };
        const response = await fetch(`${Constants.SERVER_API}/games/get/${getGame()}/blocks`, requestOptions)
        if (response.ok) {
            return await response.json();
        }
    }

    async function post_command(block, dest_index){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' , 'Authorization': 'Bearer ' + getToken() },
            body: JSON.stringify({block_id : block._id, dest_index : dest_index}),
        };
        const response = await fetch(`${Constants.SERVER_API}/${getGame()}/levels/${getLevel()}/postCommand`, requestOptions)
        if(response.ok){
            return await response.json()
        }
    }

    async function post_inner_command(block, dest_index, outer_row_id){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' , 'Authorization': 'Bearer ' + getToken() },
            body: JSON.stringify({block_id : block._id, dest_index : dest_index, outer_row_id: outer_row_id}),
        };
        const response = await fetch(`${Constants.SERVER_API}/${getGame()}/levels/${getLevel()}/postInnerCommand`, requestOptions)
        if(response.ok){
            return await response.json()
        }
    }

    async function swap_command_api(src_index, dest_index){
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' , 'Authorization': 'Bearer ' + getToken() },
            body: JSON.stringify({src_index : src_index , dest_index : dest_index}),
        };
        await fetch(`${Constants.SERVER_API}/${getGame()}/levels/${getLevel()}/swapCommand`, requestOptions)
    }

    async function swap_inner_command_api(src_index, dest_index, outer_row_id){
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' , 'Authorization': 'Bearer ' + getToken() },
            body: JSON.stringify({src_index : src_index , dest_index : dest_index, outer_row_id: outer_row_id}),
        };
        await fetch(`${Constants.SERVER_API}/${getGame()}/levels/${getLevel()}/swapInnerCommand`, requestOptions)
    }

    async function delete_command_api(index){
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + getToken() },
        };
        await fetch(`${Constants.SERVER_API}/${getGame()}/levels/${getLevel()}/deleteCommand/${index}`, requestOptions)
    }

    async function delete_inner_command_api(index, outer_row_id){
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' , 'Authorization': 'Bearer ' + getToken() },
            body: JSON.stringify({outer_row_id : outer_row_id}),
        };
        await fetch(`${Constants.SERVER_API}/${getGame()}/levels/${getLevel()}/deleteInnerCommand/${index}`, requestOptions)
    }


    return {
        get_game_level_data,
        get_game_blocks,
        swap_command_api,
        post_command,
        delete_command_api,
        post_inner_command,
        delete_inner_command_api,
        swap_inner_command_api,
        get_level_commands
    };


}


export const {get_game_level_data, get_game_blocks, swap_command_api, post_command, delete_command_api, post_inner_command, delete_inner_command_api, swap_inner_command_api, get_level_commands} = gamesAPI();
