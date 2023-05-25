
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


    if_else_mod_iteration(block, line_number) {
        if(line_number === 0){
            const dict = {"odd" : 1 , "even" : 0}
            const type = block.arguments[line_number][0]
            return `if (iteration % 2 === ${dict[type]}) `
        }
        else {
            return 'else '
        }
    }



    if_elif_else_range_iteration(block, line_number) {
        if(line_number === 0){
            const min_range = block.arguments[line_number][0]
            const max_range = block.arguments[line_number][1]
            return `if (${min_range} <= iteration && iteration <= ${max_range}) `
        } else if(line_number === 1){
            const min_range = block.arguments[line_number][0]
            const max_range = block.arguments[line_number][1]
            return `else if (${min_range} <= iteration && iteration <= ${max_range}) `
        }
        else {
            return 'else '
        }
    }


}