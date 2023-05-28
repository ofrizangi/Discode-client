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
        <div className='background background-blue'>
            <ul className="nav">
                <li className="nav-item">
                    <span className="nav-link" onClick={logout}> Logout </span>
                </li>
            </ul>
            <div className='center games-center'>
                <h1 className='page-title'> DISCODE games </h1>
            <div className='games-container'>
            {games.map((game) => {
                    return <GameButton key={game.game_name} game_name={game.game_name}/>
                })
            }
            </div>
            </div>
        </div>
      );
  }
  
  export default Games;