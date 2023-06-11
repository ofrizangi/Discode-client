const createBlocksProvider = () => {

    let _commands = JSON.parse(localStorage.getItem('COMMANDS')) || null
    let _solution = JSON.parse(localStorage.getItem('SOLUTION')) || null


    const set_commands = (commands) => {
        _commands = commands

        
        if(commands){
            localStorage.setItem('COMMANDS', JSON.stringify(commands))
        }
        else{
            localStorage.removeItem('COMMANDS')
        }
    }

    const get_commands=() => {
        return _commands  
    }

    const set_solution = (solution) => {
        _solution = solution
        if(solution){
            localStorage.setItem('SOLUTION', JSON.stringify(solution))
        }
        else{
            localStorage.removeItem('SOLUTION')
        }
    }

    const get_solution=() => {
        return _solution  
    }

    return {
        set_commands,
        get_commands,
        set_solution,
        get_solution
    };
}

export const {set_commands, get_commands, set_solution, get_solution} = createBlocksProvider();