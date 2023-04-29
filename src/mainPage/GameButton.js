import { useNavigate } from 'react-router-dom'
import { setGame } from "./GameProvider";
import React from 'react';
import './games.css';
function LevelOpenButton(props) {

    const navigate = useNavigate();

    function goto_game_levels(event){
        setGame(props.game_name)
        navigate('/levels')
    }

    return (
        <button className='column' onClick={goto_game_levels}>
            <img src={props.game_img} alt={props.game_name}/>
            <div>{props.game_name}</div>
        </button> 
      );
  }
  
  export default LevelOpenButton;