import './levels.css'
import key from '../images/open_lock.png'
import {setLevel} from '../levelsPage/LevelProvider'
import { useNavigate } from 'react-router-dom'
import React from 'react';

function LevelOpenButton(props) {

    const navigate = useNavigate();

    function goto_game(event){
        setLevel(props.level.level_number)
        navigate('/game')
    }

    return (
        <span>
            <button className='keyButton' onClick={goto_game}>
                <img src={key} alt="buttonpng" className='keyButton'/>
                {props.level.description ? props.level.description : props.level.level_number}            
            </button>
        </span>
      );
  }
  
  export default LevelOpenButton;