import * as Constants from '../constants';

const createLevelProvider = () => {

    let _level_number = JSON.parse(localStorage.getItem(Constants.LEVEL)) || null

    const setLevel = (level_number) => {
        _level_number = level_number
        if(level_number){
            localStorage.setItem(Constants.LEVEL, JSON.stringify(level_number))
        }
        else{
            localStorage.removeItem(Constants.LEVEL)
        }
    }

    const getLevel=() => {
        return _level_number  
    }

    return {
        setLevel,
        getLevel,
    };
}
export const {setLevel, getLevel} = createLevelProvider();