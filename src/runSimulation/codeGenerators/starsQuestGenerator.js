
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
        return `${word} (board[get_next_row("${dirction}",1)][get_next_col("${dirction}",1)] === "${object_type}") `
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

    if_elif_else_next_step_opertor(block, line_number) {
        const dict = {"and" : "&&" , "or" : "||"}
        if(line_number === 0){
            console.log(block.arguments[line_number])
            const object_type_first = block.arguments[line_number][0]
            const dirction_first = block.arguments[line_number][1]
            const opertor = block.arguments[line_number][2] 
            const object_type_second = block.arguments[line_number][3]
            const dirction_second = block.arguments[line_number][4]
            return `if (board[get_next_row("${dirction_first}",1)][get_next_col("${dirction_first}",1)] === "${object_type_first}" \n ${dict[opertor]} board[get_next_row("${dirction_second}",1)][get_next_col("${dirction_second}",1)] === "${object_type_second}") `
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
            return `if (score[get_next_row("${first_direction}",1)][get_next_col("${first_direction}",1)] ${dict[opertor]} score[get_next_row("${second_direction}",1)][get_next_col("${second_direction}",1)]) `
        }
        
    }

}