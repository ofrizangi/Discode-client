const createLevelProvider = () => {

    let _level_number = JSON.parse(localStorage.getItem('LEVEL_NUMBER')) || null

    const setLevel = (level_number) => {
        _level_number = level_number
        if(level_number){
            localStorage.setItem('LEVEL_NUMBER', JSON.stringify(level_number))
        }
        else{
            localStorage.removeItem('LEVEL_NUMBER')
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