
import * as Constants from '../../constants';

import { getLevel } from '../../levelsPage/LevelProvider';
import { getToken } from '../../userManagment/authorization';
import { getGame } from '../../mainPage/GameProvider';

function BlockBoard(props) {

    async function sloved_game() {
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Authorization': 'Bearer ' + getToken() },
        };
        const response = await fetch(`${Constants.SERVER_API}/${getGame()}/levels/solve/${getLevel()}`, requestOptions)
        if(response.ok){
            const my_game = await response.json();
            await props.setGame(my_game)
        }
    }

    async function restart_game() {
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Authorization': 'Bearer ' + getToken() },
        };
        const response = await fetch(`${Constants.SERVER_API}/${getGame()}/levels/restart/${getLevel()}`, requestOptions)
        if(response.ok){
            const my_game = await response.json();
            await props.setGame(my_game)
        }
    }

    return (
        <div>
            <p> Game Board </p>
            {props.game !== null && !props.game.solved && <button className='btn btn-success' onClick={sloved_game}> Solve me!</button>}
            {props.game !== null && props.game.solved && <button className='btn btn-danger' onClick={restart_game}> Restart level</button>}
        </div>
    );
}

export default BlockBoard;