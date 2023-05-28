import './levels.css'
import key from '../images/unlock.png'
import {setLevel} from '../levelsPage/LevelProvider'
import { useNavigate } from 'react-router-dom'
import React from 'react';
import dancer_img from '../images/dancer.png'
import quest_img from '../images/starsQuest.png'
import coder_img from '../images/coder.jpeg'

function LevelFreeStyle(props) {

    const games_information = {
        "dancer" : dancer_img,
        "starsQuest" : quest_img,
        "coder" : coder_img
    }

    const navigate = useNavigate();

    function goto_game(event){
        setLevel(1)
        navigate('/game')
    }
    
    return (
            <div className='free_style' onClick={goto_game}>
                <img src={games_information[props.game_name]} alt="buttonpng"/>
                <div className='title'>Open Mind - Free Style</div>
            </div>
      );
  }
  
  export default LevelFreeStyle;