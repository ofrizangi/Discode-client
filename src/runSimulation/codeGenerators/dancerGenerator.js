
import BaseGenerator from './baseGenerator'

export class DancerGenerator extends BaseGenerator {


    jump(block, line_number){
        const hands = block.arguments[line_number][0]
        return `jump('${hands}');`
    }

    swing(block, line_number){
        const direction = block.arguments[line_number][0]
        return `swing('${direction}');`
    }

    cartwheel(block, line_number){
        return "cartwheel();"
    }


    stomp(block, line_number){
        const direction = block.arguments[line_number][0]
        return `stomp('${direction}');`
    }


    wiggle(block, line_number){
        const direction = block.arguments[line_number][0]
        return `wiggle('${direction}');`
    }

    shrink(block, line_number){
        return "shrink();"
    }

    slide(block, line_number){
        const direction = block.arguments[line_number][0]
        return `slide('${direction}');`
    }

    turn_by(block, line_number){
        const direction = block.arguments[line_number][0]
        const angle = block.arguments[line_number][1]
        return `turn_by('${direction}' , '${angle}');`
    }


}