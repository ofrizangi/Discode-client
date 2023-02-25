import { useNavigate } from 'react-router-dom'
import { setGame } from "./GameProvider";

function LevelOpenButton(props) {

    const navigate = useNavigate();

    function goto_game_levels(event){
        setGame(props.game_name)
        navigate('/levels')
    }

    return (
        <div>
            <button className="btn btn-primary" onClick={goto_game_levels}> {props.game_name} </button>
        </div>
      );
  }
  
  export default LevelOpenButton;