const createGameProvider = () => {

    let _game_name = JSON.parse(localStorage.getItem('GAME_NAME')) || null

    const setGame = (game_name) => {
        _game_name = game_name
        if(game_name){
            localStorage.setItem('GAME_NAME', JSON.stringify(game_name))
        }
        else{
            localStorage.removeItem('GAME_NAME')
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
