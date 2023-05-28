import { useState, useEffect } from 'react';
import * as Constants from '../constants';
import { getGame } from "../mainPage/GameProvider";
import LevelClosedButton from './LevelClosedButton';
import LevelOpenButton from './LevelOpenButton';
import LevelFreeStyle from './LeveFreeStyle';
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
            const response = await fetch(`${process.env.REACT_APP_SERVER_API}/${getGame()}/levels/getAll`, requestOptions)
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
        <div className='background'>
            <h1 className='title'> Welcome to {getGame()} game levels page </h1>
            <div className='level_screen'>
            <LevelFreeStyle key={levels[0]} game_name={getGame()}></LevelFreeStyle>
            <div className='levels-grid'>
                {levels.map((level) => {
                        if (level.level_number  > 1 ){
                            if(level.locked){
                            return  <LevelClosedButton key={level.level_number} level={level}/>
                        }
                        else {
                            return <LevelOpenButton key={level.level_number} level={level}/>
                        }
                    }

                    })
                }
             </div>
             </div>
            <button className="btn btn-primary" onClick={goto_fourm}> go to Fourm</button>
        </div>
      );
  }
  
  export default Levels;