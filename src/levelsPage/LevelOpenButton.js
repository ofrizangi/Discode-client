import './levels.css'
import key from '../images/unlock.png'
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
            <div className="circle green" onClick={goto_game}>
                 <div className='object-center'>
                <img src={key} alt="buttonpng" className='lock-img'/>
                <div className='title'>{props.level.level_number-1}</div>
                </div>
            </div>
      );
  }
  
  export default LevelOpenButton;