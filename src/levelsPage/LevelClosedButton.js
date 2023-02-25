import './levels.css'
import key from '../images/closed_lock.png'

function LevelClosedButton(props) {
    return (
        <span>
            <button className='keyButton'>
                <img className="keyButton" src={key} alt="buttonpng"/>
                {props.level.level_number}
            </button>
        </span>
      );
  }
  
  export default LevelClosedButton;