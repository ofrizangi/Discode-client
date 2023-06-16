import './levels.css'
import key from '../images/unlock.png'
import {setLevel} from './LevelProvider'
import { useNavigate } from 'react-router-dom'
import React from 'react';
import dancer_img from '../images/freestyle_dancer.png'
import quest_img from '../images/freestyle_starQuest.png'
import coder_img from '../images/freestyle_coder.png'

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
        <div className="circle blue" onClick={goto_game}>
            <img src={games_information[props.game_name]} alt="buttonpng" className='icon-img'/>
            <div className='freestyle'>Freestyle</div>
        </div>
      );
  }
  export default LevelFreeStyle;