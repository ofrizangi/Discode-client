import * as Constants from '../constants';

import { setToken, getToken } from "../userManagment/authorization";
import { setGame } from "./GameProvider";
import { setLevel } from "../levelsPage/LevelProvider";
import { useState, useEffect } from 'react';
import GameButton from './GameButton'
import React from 'react';
import './games.css';


function Games(props) {

    const [games, setGames] = useState([])


    function logout(){
        setToken(null)
        setGame(null)
        setLevel(null)
        props.setIsLogged(false)
    }

    useEffect(() => {
        async function get_all_game_levels(){
            const requestOptions = {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + getToken() },
            };
            const response = await fetch(`${process.env.REACT_APP_SERVER_API}/games/getAll`, requestOptions)
            if (response.ok){
                const gameList = await response.json();
                setGames(gameList)
            }
        }
        get_all_game_levels()
    }, []);


    return (
        <div>
            {console.log(games)}
            {console.log(getToken())}
            <ul className="nav">
                <li className="nav-item">
                    <button className="nav-link" onClick={logout}> Logout </button>
                </li>
            </ul>
            <h1> Welcome to Discode Game page </h1>
            <div className='games'>
            {games.map((game) => {
                    return <GameButton key={game.game_name} game_name={game.game_name}/>
                })
            }
            </div>
        </div>
      );
  }
  
  export default Games;