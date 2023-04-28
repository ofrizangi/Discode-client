import {get_level_commands, get_game_level_data} from '../gamePage/gamesAPI'
import { DancerGenerator } from '../codeGenerators/dancerGenerator'
import { getGame } from '../mainPage/GameProvider'

const CodeCreator = () => {

    const game_generators = {
        "dancer" : new DancerGenerator()
    }

    async function translate_blocks(){
        const commands = await get_level_commands()
        const data = await get_game_level_data()
        const solution = data.solution
        const generator = game_generators[getGame()]

        const compilation_error = check_compilation_errors(commands)
        if(compilation_error === ""){
            return rec_translate_blocks(commands, solution, generator, "")
        }
        else {
            return compilation_error
        }
    }


    function check_compilation_errors(commands){
        for(let i = 0 ;i < commands.length ; i++){
            const row = commands[i]

            if(row.block.complex === 0){
                for(let i=0; i<row.arguments[0].length; i++){
                    if(row.arguments[0][i] === null){
                        return `Complation error - ${row.block._id} is missing arguments`
                    }
                }
            }
            else {
                for(let line_number=0; line_number<row.block.complex; line_number++){
                    if(row.inner_blocks[line_number].length === 0){
                        return `Complation error - ${row.block._id} must contain inside other blocks`
                    }
                    for(let i=0; i<row.arguments[line_number].length; i++){
                        if(row.arguments[line_number][i] === null){
                            return `Complation error - ${row.block._id} is missing arguments`
                        }
                    }
                }
            }
        }
        return ""
    }

    function rec_translate_blocks(commands, solution, generator, tab){
        var code = ""
        for(let i = 0 ;i < solution.length ; i++){
            const index = commands.findIndex(element => element._id === solution[i])
            const row = commands[index]
            const block_id = row.block._id
            if(row.block.complex === 0){
                code += tab + generator[block_id](row, 0) + "\n"
            } else {
                for(let line_num = 0; line_num < row.block.complex; line_num++){
                    code += tab + generator[block_id](row, line_num)
                    var new_tab = tab + "\t"
                    code += "{\n" + rec_translate_blocks(commands, row.inner_blocks[line_num], generator, new_tab) + tab + "}\n"
                }
            }
        }
        return code
    }


    return {
        translate_blocks
    };
}

export const {translate_blocks} = CodeCreator();
