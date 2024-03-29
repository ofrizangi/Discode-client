import { useState, useEffect } from 'react';
import * as Constants from '../constants';
import { getGame } from "../mainPage/GameProvider";
import LevelClosedButton from './LevelClosedButton';
import LevelOpenButton from './LevelOpenButton';
import LevelFreeStyle from './LevelFreeStyle';
import {getToken} from '../userManagment/authorization'
import React from 'react';
import { useNavigate } from 'react-router-dom'

function Levels(props) {

    const [levels, setLevels] = useState([])
    const navigate = useNavigate();


    const games_information = {
        "dancer" : ["Dancer"],
        "starsQuest" : ["Stars Quest"],
        "coder" : ["Coder"]
    }

    useEffect(() => {
        async function get_all_game_levels(){
            const requestOptions = {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + getToken() },
            };
            const response = await fetch(`${process.env.REACT_APP_SERVER_API}/${getGame()}/levels/getAll`, requestOptions)
            if (response.ok){
                const levelList = await response.json();
                setLevels(levelList)
            }
        }
        get_all_game_levels()
    }, []);

    function goto_games(){
        navigate('/')
    }
    
    return (
        <div className='background background-grey'>
            <div className='levels-header'>
                <ul className="nav">
                    <li className="nav-item nav-levels">
                        <span className="nav-link" onClick={goto_games}>Games</span>
                    </li>
                </ul>
                <h1 className='page-title'> {games_information[getGame()][0]} levels</h1>
            </div>
                <div className='levels-grid-4'>
                    {levels.map((level) => ( level.level_number === Constants.FREE_STYLE_LEVEL ? <LevelFreeStyle key={level.level_number} game_name={level.game_name}></LevelFreeStyle> : 
                                            level.locked ? <LevelClosedButton key={level.level_number} level={level}/> : 
                                                    <LevelOpenButton key={level.level_number} level={level}/>))
                }
                </div>
        </div>
      );
  }
  export default Levels;