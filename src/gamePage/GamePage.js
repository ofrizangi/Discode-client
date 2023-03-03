import * as Constants from '../constants';

import { useState, useEffect } from 'react';

import { getLevel } from '../levelsPage/LevelProvider';
import { getToken } from '../userManagment/authorization';
import { getGame } from '../mainPage/GameProvider';
import BlockList from './blockList/BlockList';
import BlockBoard from './blockBoard/BlockBoard';
import GameBoard from './gameBoard/GameBoard';


function GamePage(props) {

    // contains the data of this specific game level
    const [game, setGame] = useState(null)

    useEffect(() => {
        async function get_game_level_data(){
            const requestOptions = {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + getToken() },
            };
            const response = await fetch(`${Constants.SERVER_API}/${getGame()}/levels/getOne/${getLevel()}`, requestOptions)
            if (response.ok) {
                const my_game = await response.json();
                await setGame(my_game[0])
            }
        }
        get_game_level_data()
    }, []);


    return (
        <div>
            <h1> Game page </h1>
            { game !== null &&
            <div className="row d-none d-md-flex">
                <div className="col-2"> <BlockList/> </div>
                <div className="col-4"> <BlockBoard solution={game.solution}/> </div>
                <div className="col-6"> <GameBoard game={game} setGame={setGame}/> </div>
            </div>
            }

        </div>
      );
}
  
export default GamePage;