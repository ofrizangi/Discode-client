import './levels.css'
import key from '../images/lock.png'
import React from 'react';

function LevelClosedButton(props) {
    return (

        <div className="circle red">
        <div className='object-center'>
        <img src={key} alt="buttonpng" className='lock-img'/>
        <div className='title'>{props.level.level_number-1}</div>
      </div>
      </div>

      );
  }
  
  export default LevelClosedButton;