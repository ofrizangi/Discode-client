import { useState, useEffect } from 'react';
import * as Constants from '../constants';
import { getGame } from "../mainPage/GameProvider";
import LevelClosedButton from './LevelClosedButton';
import LevelOpenButton from './LevelOpenButton';
import {getToken} from '../userManagment/authorization'
import React from 'react';

import { useNavigate } from 'react-router-dom'

function Levels(props) {

    const [levels, setLevels] = useState([])
    const navigate = useNavigate();



    useEffect(() => {
        async function get_all_game_levels(){
            const requestOptions = {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + getToken() },
            };
            const response = await fetch(`${Constants.SERVER_API}/${getGame()}/levels/getAll`, requestOptions)
            if (response.ok){
                const levelList = await response.json();
                setLevels(levelList)
            }
        }
        get_all_game_levels()
    }, []);

    function goto_fourm(event){
        navigate('/forum')
    }
    return (
        <div>
            <h1> Welcome to {getGame()} game levels page </h1>
            {levels.map((level) => {
                    return level.locked ? <LevelClosedButton key={level.level_number} level={level}/>: <LevelOpenButton key={level.level_number} level={level}/>
                })
            }
            <button className="btn btn-primary" onClick={goto_fourm}> go to Fourm</button>
        </div>
      );
  }
  
  export default Levels;