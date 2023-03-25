import { First } from "react-bootstrap/esm/PageItem"

export default class BaseGenerator {


    repeat(block){
        const times = block.arguments[0]
        return `for (let iteration = 0; iteration < ${times}; iteration++) `
    }

    if_number_iteration(block) {
        const number = block.arguments[0]
        return `if (iteration === ${number}) `
    }

    
    if_mod_iteration(block) {
        const dict = {"odd" : 1 , "even" : 0}
        const type = block.arguments[0]
        return `if (iteration % 2 === ${dict[type]}) `
    }


}