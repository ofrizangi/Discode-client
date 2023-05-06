
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


    //no entry
    if_else_next_step(block, line_number) {
        if(line_number === 0){
            const object_type = block.arguments[line_number][0]
            const dirction = block.arguments[line_number][1]
            return `if (board[get_next_optional_row("${dirction}")][get_next_optional_col("${dirction}")] === "${object_type}") `
        }
        else {
            return 'else '
        }
    }

    if_else_next_step_opertor(block, line_number) {
        const dict = {"and" : "&&" , "or" : "||"}
        if(line_number === 0){
            console.log(block.arguments[line_number])
            const object_type_first = block.arguments[line_number][0]
            const dirction_first = block.arguments[line_number][1]
            const opertor = block.arguments[line_number][2] 
            const object_type_second = block.arguments[line_number][3]
            const dirction_second = block.arguments[line_number][4]
            return `if (board[get_next_optional_row("${dirction_first}")][get_next_optional_col("${dirction_first}")] === "${object_type_first}" \n ${dict[opertor]} board[get_next_optional_row("${dirction_second}")][get_next_optional_col("${dirction_second}")] === "${object_type_second}") `
        }
        else {
            return 'else '
        }
    }

    if_else_score

    if_else_score(block, line_number) {
        const dict = {"bigger" : ">" , "smaller" : "<"}
        if(line_number === 0){
            const object_type_first = block.arguments[line_number][0]
            const dirction_first = block.arguments[line_number][1]
            const opertor = block.arguments[line_number][2] 
            const object_type_second = block.arguments[line_number][3]
            const dirction_second = block.arguments[line_number][4]
            return `if (score[get_next_optional_row("${dirction_first}")][get_next_optional_col("${dirction_first}")] ${dict[opertor]} score[get_next_optional_row("${dirction_second}")][get_next_optional_col("${dirction_second}")]) `
        }
        else {
            return 'else '
        }
    }

}