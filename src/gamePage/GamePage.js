
import { useState, useEffect } from 'react';
import { get_game_level_data } from './gamesAPI';

import GameBoard from './gameBoard/GameBoard';
import BlockPage from './blocksPage/BlocksPage';

import React from 'react';

function GamePage(props) {

    // contains the data of this specific game level
    const [gameLevel, setGameLevel] = useState(null)

    useEffect(() => {
        async function set_game(){
            const my_level = await get_game_level_data()
            setGameLevel(my_level)
        }
        set_game()
    }, []);

    
    return (
        <div>
            <h1> Game page </h1>
            { gameLevel !== null &&
                <div className="row d-none d-md-flex">
                    <div className='col-5'> <BlockPage gameLevel={gameLevel}></BlockPage> </div>
                    <div className="col-7"> <GameBoard game={gameLevel} setGame={setGameLevel}/> </div>
                </div>
            }
        </div>
      );
}
  
export default GamePage;