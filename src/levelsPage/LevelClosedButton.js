import './levels.css'
import key from '../images/closed_lock.png'
import React from 'react';

function LevelClosedButton(props) {
    return (
        <span>
            <button className='keyButton'>
                <img src={key} alt="buttonpng" className='keyButton'/>
                {props.level.description ? props.level.description : props.level.level_number}
            </button>
        </span>
      );
  }
  
  export default LevelClosedButton;