import { useState, useEffect } from 'react';
import * as Constants from '../constants';
import { getGame } from "../mainPage/GameProvider";
import LevelClosedButton from './LevelClosedButton';
import LevelOpenButton from './LevelOpenButton';
import {getToken} from '../userManagment/authorization'

function Levels(props) {

    const [levels, setLevels] = useState([])

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

    return (
        <div>
            <h1> Welcome to {getGame()} game levels page </h1>
            {levels.map((level) => {
                    return level.locked ? <LevelClosedButton key={level.level_number} level={level}/>: <LevelOpenButton key={level.level_number} level={level}/>
                })
            }
        </div>
      );
  }
  
  export default Levels;