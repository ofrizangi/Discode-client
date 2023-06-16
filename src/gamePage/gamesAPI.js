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
        const response = await fetch(`${process.env.REACT_APP_SERVER_API}/${getGame()}/levels/getOne/${getLevel()}`, requestOptions)
        if (response.ok) {
            return await response.json();
        }
    }

    async function get_level_commands(){
        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + getToken() },
        };
        const response = await fetch(`${process.env.REACT_APP_SERVER_API}/${getGame()}/levels/${getLevel()}/commands/getAll`, requestOptions)
        if (response.ok) {
            return await response.json();
        }
    }

    async function sloved_game() {
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Authorization': 'Bearer ' + getToken() },
        };
        const response = await fetch(`${process.env.REACT_APP_SERVER_API}/${getGame()}/levels/solve/${getLevel()}`, requestOptions)
        if(response.ok){
            return await get_game_level_data() //getting the data from here so it would do populate
        }
    }

    async function restart_game() {
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Authorization': 'Bearer ' + getToken() },
        };
        const response = await fetch(`${process.env.REACT_APP_SERVER_API}/${getGame()}/levels/restart/${getLevel()}`, requestOptions)
        if(response.ok){
            return await response.json();
        }
    }

    async function post_command(block, dest_index){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' , 'Authorization': 'Bearer ' + getToken() },
            body: JSON.stringify({block_id : block._id, dest_index : dest_index}),
        };
        const response = await fetch(`${process.env.REACT_APP_SERVER_API}/${getGame()}/levels/${getLevel()}/postCommand`, requestOptions)
        if(response.ok){
            return await response.json()
        }
    }

    async function post_inner_command(block, dest_index, outer_row_id, list_number){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' , 'Authorization': 'Bearer ' + getToken() },
            body: JSON.stringify({block_id : block._id, dest_index : dest_index, outer_row_id: outer_row_id, list_number:list_number}),
        };
        const response = await fetch(`${process.env.REACT_APP_SERVER_API}/${getGame()}/levels/${getLevel()}/postInnerCommand`, requestOptions)
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
        await fetch(`${process.env.REACT_APP_SERVER_API}/${getGame()}/levels/${getLevel()}/swapCommand`, requestOptions)
    }

    async function swap_inner_command_api(src_index, dest_index, outer_row_id, list_number){
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' , 'Authorization': 'Bearer ' + getToken() },
            body: JSON.stringify({src_index : src_index , dest_index : dest_index, outer_row_id: outer_row_id, list_number: list_number}),
        };
        await fetch(`${process.env.REACT_APP_SERVER_API}/${getGame()}/levels/${getLevel()}/swapInnerCommand`, requestOptions)
    }

    async function delete_command_api(index){
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + getToken() },
        };
        await fetch(`${process.env.REACT_APP_SERVER_API}/${getGame()}/levels/${getLevel()}/deleteCommand/${index}`, requestOptions)
    }

    async function delete_inner_command_api(index, outer_row_id, list_number){
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' , 'Authorization': 'Bearer ' + getToken() },
            body: JSON.stringify({outer_row_id : outer_row_id, list_number: list_number}),
        };
        await fetch(`${process.env.REACT_APP_SERVER_API}/${getGame()}/levels/${getLevel()}/deleteInnerCommand/${index}`, requestOptions)
    }

    async function post_code_api(code){
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' , 'Authorization': 'Bearer ' + getToken() },
            body: JSON.stringify({code : code}),
        };
        await fetch(`${process.env.REACT_APP_SERVER_API}/${getGame()}/levels/postCode/${getLevel()}`, requestOptions)
    }

    async function post_best_score_api(best_score){
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' , 'Authorization': 'Bearer ' + getToken() },
            body: JSON.stringify({best_score : best_score}),
        };
        await fetch(`${process.env.REACT_APP_SERVER_API}/${getGame()}/levels/postBestScore/${getLevel()}`, requestOptions)
    }

    return {
        get_game_level_data,
        swap_command_api,
        post_command,
        delete_command_api,
        post_inner_command,
        delete_inner_command_api,
        swap_inner_command_api,
        get_level_commands,
        sloved_game,
        restart_game,
        post_code_api,
        post_best_score_api
    };


}
export const {get_game_level_data, swap_command_api, post_command, delete_command_api, post_inner_command, delete_inner_command_api,
            swap_inner_command_api, get_level_commands, sloved_game, restart_game, post_code_api,post_best_score_api} = gamesAPI();
