import * as Constants from '../constants';

const createGameProvider = () => {

    let _game_name = JSON.parse(localStorage.getItem(Constants.GAME)) || null

    const setGame = (game_name) => {
        _game_name = game_name
        if(game_name){
            localStorage.setItem(Constants.GAME, JSON.stringify(game_name))
        }
        else{
            localStorage.removeItem(Constants.GAME)
        }
    }

    const getGame =() => {
        return _game_name  
    }

    return {
        setGame,
        getGame,
    };
}

export const {setGame, getGame} = createGameProvider();
