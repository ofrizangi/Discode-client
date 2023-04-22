
import { useState, useEffect } from 'react';
import { get_game_level_data } from './gamesAPI';
import GameBoard from './gameBoard/GameBoard';
import BlockPage from './blocksPage/BlocksPage';

import React from 'react';
import './game.css'
function GamePage(props) {

    // contains the data of this specific game level
    const [gameLevel, setGameLevel] = useState(null)
    useEffect(() => {
        async function set_game(){
            const my_level = await get_game_level_data()
            console.log("GamePage", my_level)
            setGameLevel(my_level)
        }
        set_game()
        
    }, []);

    
    return (
        <div>
            <h1> Game page </h1>
            { gameLevel !== null &&
                <div className="row d-none d-md-flex">
                    <div className='col-6'>
                        <BlockPage gameLevel={gameLevel}></BlockPage>
                        {gameLevel.game_name === "dancer" && gameLevel.level_number !== -1 ?  <video className="gdriveVideo" preload="auto"  width="300" height="250" controls>
                        <source src={gameLevel.video_src} type='video/mp4'/>
                        </video> : <div/>}        
                    </div>
                    <div className="col-6">
                         <GameBoard game={gameLevel} setGame={setGameLevel}/>
                    </div>
                    <div id="model"></div>             
                </div>
            }
        </div>
      );
}
  
export default GamePage;