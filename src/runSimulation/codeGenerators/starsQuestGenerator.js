
import BaseGenerator from './baseGenerator'

export class StarsQuestGenerator extends BaseGenerator {

    drive(block, line_number){
        const numberSteps = block.arguments[line_number][0]
        return `drive(${numberSteps});`
    }

    turn(block, line_number){
        const direction = block.arguments[line_number][0]
        return `turn('${direction}');`
    }
    
    condition(word, block, line_number){
        const object_type = block.arguments[line_number][0]
        const dirction = block.arguments[line_number][1]
        return `${word} (board[get_next_row("${dirction}")][get_next_col("${dirction}")] === "${object_type}") `
    }


    if_elif_elif_else_next_step(block, line_number) {
        if(line_number === 0){
            return this.condition("if",block, line_number)
        } else if(line_number === 1 || line_number === 2){
            return  this.condition("else if",block, line_number)
        } 
        else {
            return 'else '
        }
    }

    
    if_elif_else_next_step(block, line_number) {
        if(line_number === 0){
         return this.condition("if",block, line_number)
        } else if(line_number === 1){
            return this.condition("else if",block, line_number)
        }
        else {
            return 'else '
        }
    }

    if_elif_else_next_step_or(block, line_number) {
        // const dict = {"and" : "&&" , "or" : "||"}
        if(line_number === 0){
            console.log(block.arguments[line_number])
            const object_type_first = block.arguments[line_number][0]
            const dirction_first = block.arguments[line_number][1]
            const object_type_second = block.arguments[line_number][2]
            const dirction_second = block.arguments[line_number][3]
            return `if (board[get_next_row("${dirction_first}")][get_next_col("${dirction_first}")] === "${object_type_first}" \n || board[get_next_row("${dirction_second}")][get_next_col("${dirction_second}")] === "${object_type_second}") `
        } else if(line_number === 1){
            return this.condition("else if",block, line_number)
        } else {
            return 'else '
        }
    }

    
    if_score(block, line_number) {
        const dict = {"bigger" : ">" , "smaller" : "<"}
        if(line_number === 0){
            const first_direction = block.arguments[line_number][0]
            const opertor = block.arguments[line_number][1] 
            const second_direction = block.arguments[line_number][2]
            return `if (score[get_next_row("${first_direction}")][get_next_col("${first_direction}")] ${dict[opertor]} score[get_next_row("${second_direction}")][get_next_col("${second_direction}")]) `
        }
        
    }

    drive_const(block, line_number){
        return `drive(number_steps);`
    }

    number_steps(block, line_number){
        const numberSteps = block.arguments[line_number][0]
        return `let number_steps = ${numberSteps};`
    }
    upate_number_steps(block, line_number){
        const number = block.arguments[line_number][0]
        return `number_steps = number_steps -  ${number};`
    }

}