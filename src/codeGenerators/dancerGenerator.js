
import BaseGenerator from './baseGenerator'

export class DancerGenerator extends BaseGenerator {


    jump(block){
        const hands = block.arguments[0]
        return `jump('${hands}');`
    }

    swing(block){
        const direction = block.arguments[0]
        return `swing('${direction}');`
    }

    cartwheel(block){
        return "cartwheel();"
    }


    stomp(block){
        const direction = block.arguments[0]
        return `stomp('${direction}');`
    }


    wiggle(block){
        const direction = block.arguments[0]
        return `wiggle('${direction}');`
    }

    shrink(block){
        return "shrink();"

    }

    slide(block){
        const direction = block.arguments[0]
        return `slide('${direction}');`
    }

    turn(block){
        const direction = block.arguments[0]
        const angle = block.arguments[1]
        return `turn('${direction}' , '${angle}');`
    }


}