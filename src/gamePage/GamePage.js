import * as Constants from '../constants';

import { useState, useEffect } from 'react';

import { getLevel } from '../levelsPage/LevelProvider';
import {getToken } from '../userManagment/authorization';
import { getGame } from '../mainPage/GameProvider';


function GamePage(props) {

    const [game, setGame] = useState(null)

    useEffect(() => {
        async function get_game_level(){
            const requestOptions = {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + getToken() },
            };
            const response = await fetch(`${Constants.SERVER_API}/${getGame()}/levels/getOne/${getLevel()}`, requestOptions)
            if (response.ok){
                const my_game = await response.json();
                setGame(my_game[0])
            }
        }
        get_game_level()
    }, []);


    async function sloved_game(){
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Authorization': 'Bearer ' + getToken() },
        };
        const response = await fetch(`${Constants.SERVER_API}/${getGame()}/levels/solve/${getLevel()}`, requestOptions)
        if(response.ok){
            const my_game = await response.json();
            setGame(my_game)
        }
    }

    async function restart_game(){
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Authorization': 'Bearer ' + getToken() },
        };
        const response = await fetch(`${Constants.SERVER_API}/${getGame()}/levels/restart/${getLevel()}`, requestOptions)
        if(response.ok){
            const my_game = await response.json();
            setGame(my_game)
        }
    }

    return (
        <div>
            <h1> Game page </h1>
            {game !== null && !game.solved && <button className='btn btn-success' onClick={sloved_game}> Solve me!</button>}
            {game !== null && game.solved && <button className='btn btn-danger' onClick={restart_game}> Restart level</button>}
        </div>
      );
}
  
export default GamePage;