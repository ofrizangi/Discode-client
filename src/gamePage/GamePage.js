
import { useState, useEffect } from 'react';
import { get_game_level_data } from './gamesAPI';

import GameBoard from './gameBoard/GameBoard';
import BlockPage from './blocksPage/BlocksPage';

import React from 'react';

function GamePage(props) {

    // contains the data of this specific game level
    const [game, setGame] = useState(null)

    useEffect(() => {
        async function set_game(){
            const my_game = await get_game_level_data()
            setGame(my_game)
        }
        set_game()
    }, []);

    
    return (
        <div>
            <h1> Game page </h1>
            { game !== null &&
                <div className="row d-none d-md-flex">
                    <div className='col-5'> <BlockPage solution={game.solution} max_number_of_rows={game.max_number_of_rows} ></BlockPage> </div>
                    <div className="col-7"> <GameBoard game={game} setGame={setGame}/> </div>
                </div>
            }
        </div>
      );
}
  
export default GamePage;