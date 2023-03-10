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
        await fetch(`${Constants.SERVER_API}/${getGame()}/levels/${getLevel()}/postCommand`, requestOptions)
    }


    async function swap_command(src_index, dest_index){
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' , 'Authorization': 'Bearer ' + getToken() },
            body: JSON.stringify({src_index : src_index , dest_index : dest_index}),
        };
        await fetch(`${Constants.SERVER_API}/${getGame()}/levels/${getLevel()}/swapCommand`, requestOptions)
    }

    async function delete_command(index){
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + getToken() },
        };
        await fetch(`${Constants.SERVER_API}/${getGame()}/levels/${getLevel()}/deleteCommand/${index}`, requestOptions)
    }


    return {
        get_game_level_data,
        get_game_blocks,
        swap_command,
        post_command,
        delete_command
    };


}


export const {get_game_level_data, get_game_blocks, swap_command, post_command, delete_command} = gamesAPI();
