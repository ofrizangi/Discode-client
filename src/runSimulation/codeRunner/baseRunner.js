
import CodeModal from '../../alerts/CodeModal'
import { createRoot } from 'react-dom/client';
import * as Constants from '../../constants';

export default class BaseRunner {

    constructor(code,back_to_levels, next_level, gameSence, blocks, leftSideView,expected_solution, solve_in_server_function){
        this.back_to_levels = back_to_levels
        this.next_level = next_level
        this.actionsList = []
        this.compareSolution = {}
        this.gameSence = gameSence
		this.blocks = blocks
		this.leftSideView = leftSideView
		this.code = this.leftSideView === 'editor' ? this.get_main_function_call() + ";" + code : code
		this.expected_solution = expected_solution
		this.solve_in_server_function = solve_in_server_function
    }


	get_main_function_call(){
        const game_blocks = this.blocks.filter(element => element.is_game_block)
        const game_blocks_id = game_blocks.map(obj => obj._id)
        return "main("+ game_blocks_id.join(',') + ")"
    }

	get_blocks_game_empty_functions(){
        const game_blocks = this.blocks.filter(element => element.is_game_block)
        const game_blocks_id = game_blocks.map(obj => obj._id)
		var str = ""
		for(let i=0; i< game_blocks_id.length; i++){
			str += `function ${game_blocks_id[i]}(){}`
		}
        return str
    }

    check_errors(error){
		if(error.message === "iteration is not defined"){
			return "Error - if iteration must be inside repeat block"
		}
		return `Error - ${error.message}`
    }

	validate_arguments(blocks, block_id, args) {
		const block = blocks.filter(obj => obj._id === block_id)[0]
		// all the commands we write in code are simple one that have only one line
		const arguments_type = block.arguments_type[0]
		for(let i=0;i<args.length; i++){
			if(arguments_type[i] === undefined){
				throw new Error(`too many arguments in command "${block_id}"`)
			}
			if(Array.isArray(arguments_type[i])){
				if(!arguments_type[i].includes(args[i])){
					throw new Error(`argument "${args[i]}" is not valid`)
				}
			}
			if(arguments_type[i] === Constants.NUMBER_ARGUMENT) {
				if( typeof(args[i]) !== "number"){
					throw new Error(`argument "${args[i]}" is not valid`)
				}
				if( args[i] <=0 ){
					throw new Error(`argument "${args[i]}" must be a positive number`)
				}
			}
		}
	}

	checkSolution(score){}


    showModel(score, message_from_sence){
		// console.log(message_from_sence, score)
		const information_on_soultion = this.checkSolution(score, message_from_sence);
		if (information_on_soultion.compare)
		{
			this.solve_in_server_function()
		}
      setTimeout(() => {
        const gameBoard = createRoot(document.getElementById('model') );
        const model = <CodeModal text={this.leftSideView === "blocks" ? this.code : ""} message = {information_on_soultion.message} compare={information_on_soultion.compare} back={this.back_to_levels} next_level={this.next_level}/>
        gameBoard.render(model);
        },500);
    }
    

	async if_infinite_code(){
        var bb = new Blob([ this.get_blocks_game_empty_functions() + this.code + "postMessage('done')"], {
            type: 'text/javascript'
        });
		// console.log(bb)
        var bbURL = URL.createObjectURL(bb);

        try {
            await this.runWorker(bbURL)
			return false
		} catch(e) {
			return true
		}
	}

	runWorker(workerUrl) {
        return new Promise(function(resolve, reject) {
          	var worker = new Worker(workerUrl);
            worker.onmessage = function(event) {
                // Worker has finished its execution
                resolve(event.data);
                worker.terminate();
                clearTimeout(timeout);
            };
            worker.onerror = function(error) {
                // Worker encountered an error
                resolve(error.message);
                worker.terminate();
                clearTimeout(timeout);
            };
            var timeout = setTimeout(function(){
				worker.terminate();
                worker = null;
                reject(Constants.INFINITE_CODE);

            }, 200);
        });
    }

}