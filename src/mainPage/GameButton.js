import { useNavigate } from 'react-router-dom'
import { setGame } from "./GameProvider";
import React from 'react';
import './games.css';

import dancer from '../images/dancer.png'
import quest from '../images/starsQuest.png'
import coder from '../images/coder.jpeg'


function GameButton(props) {

    const img_src = {
        "dancer" : dancer,
        "starsQuest" : quest,
        "coder" : coder
    }

    const navigate = useNavigate();

    function goto_game_levels(event){
        setGame(props.game_name)
        navigate('/levels')
    }

    return (
        <button className='column' onClick={goto_game_levels}>
            <img src={img_src[props.game_name]} alt={props.game_name}/>
            <div>{props.game_name.split("_")}</div>
        </button> 
      );
  }
  
  export default GameButton;