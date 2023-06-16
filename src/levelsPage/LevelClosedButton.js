import './levels.css'
import key from '../images/lock.png'
import React from 'react';

function LevelClosedButton(props) {
    return (
        <div className="circle red">
            <img src={key} alt="buttonpng" className='lock-img'/>
            <div className='title'>{props.level.level_number-1}</div>
        </div>
      );
  }
  
  export default LevelClosedButton;