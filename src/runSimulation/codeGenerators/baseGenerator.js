
export default class BaseGenerator {


    repeat(block, line_number){
        const times = block.arguments[line_number][0]
        return `for (let iteration = 1; iteration <= ${times}; iteration++) `
    }

    if_number_iteration(block, line_number) {
        const number = block.arguments[line_number][0]
        return `if (iteration === ${number}) `
    }

    
    if_mod_iteration(block, line_number) {
        const dict = {"odd" : 1 , "even" : 0}
        const type = block.arguments[line_number][0]
        return `if (iteration % 2 === ${dict[type]}) `
    }


    if_else_number_iteration(block, line_number) {
        if(line_number === 0){
            const number = block.arguments[line_number][0]
            return `if (iteration === ${number}) `
        }
        else {
            return 'else '
        }
    }


    if_elif_else_number_iteration(block, line_number) {
        if(line_number === 0){
            const number = block.arguments[line_number][0]
            return `if (iteration === ${number}) `
        } else if(line_number === 1){
            const number = block.arguments[line_number][0]
            return `else if (iteration === ${number}) `
        }
        else {
            return 'else '
        }
    }


}