import './levels.css'
import key from '../images/open_lock.png'
import {setLevel} from '../levelsPage/LevelProvider'
import { useNavigate } from 'react-router-dom'

function LevelOpenButton(props) {

    const navigate = useNavigate();

    function goto_game(event){
        setLevel(props.level.level_number)
        navigate('/game')
    }

    return (
        <span>
            <button className='keyButton' onClick={goto_game}>
                <img className="keyButton" src={key} alt="buttonpng"/>
                {props.level.level_number}
            </button>
        </span>
      );
  }
  
  export default LevelOpenButton;