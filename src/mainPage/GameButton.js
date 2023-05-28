import { useNavigate } from 'react-router-dom'
import { setGame } from "./GameProvider";
import React from 'react';
import './games.css';
import VideoHover from './VideoHover';
import dancer_img from '../images/dancer.png'
import quest_img from '../images/starsQuest.png'
import coder_img from '../images/coder.jpeg'
import dancer_video from '../images/dancer.mp4'
import quest_video from '../images/starsQuest.mp4'
import coder_video from '../images/coder.mp4'

function GameButton(props) {

    const games_information = {
        "dancer" : [dancer_img, dancer_video, "Dancer"],
        "starsQuest" : [quest_img, quest_video, "Stars Quest"],
        "coder" : [coder_img, coder_video, "Coder"]
    }

    const navigate = useNavigate();

    function goto_game_levels(event){
        setGame(props.game_name)
        navigate('/levels')
    }

    return (
        <div className='polaroid' onClick={goto_game_levels}>
            <VideoHover
                imageSrc={games_information[props.game_name][0]}
                videoSrc={games_information[props.game_name][1]}
            />
            <h2 className='title games_names'>{games_information[props.game_name][2]}</h2>
        </div> 
      );
  }
  
  export default GameButton;