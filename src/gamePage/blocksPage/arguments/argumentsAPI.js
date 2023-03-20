import * as Constants from '../../../constants';

import { getLevel } from '../../../levelsPage/LevelProvider';
import { getToken } from '../../../userManagment/authorization';
import { getGame } from '../../../mainPage/GameProvider';



const argumentsAPI = () => {


    async function post_argument(row_id, index, value){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' , 'Authorization': 'Bearer ' + getToken() },
            body: JSON.stringify({value : value}),
        };
        const response = await fetch(`${Constants.SERVER_API}/${getGame()}/levels/${getLevel()}/rows/${row_id}/postArgument/${index}`, requestOptions)
        if(response.ok){
            return await response.json()
        }
    }


    return {
        post_argument
    };


}


export const {post_argument} = argumentsAPI();
