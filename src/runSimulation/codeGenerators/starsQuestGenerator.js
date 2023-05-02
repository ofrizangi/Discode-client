
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
}