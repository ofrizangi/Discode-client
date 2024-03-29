
import CodeModal from '../../alerts/CodeModal'
import { createRoot } from 'react-dom/client';
import * as Constants from '../../constants';

export default class BaseRunner {

    constructor(code,level_number,back_to_levels, next_level, retry_level, gameSence, blocks, leftSideView,expected_solution, solve_in_server_function){
        this.back_to_levels = back_to_levels
        this.next_level = next_level
		this.retry_level = retry_level
        this.compareSolution = {}
        this.gameSence = gameSence
		this.blocks = blocks
		this.leftSideView = leftSideView
		this.code = this.leftSideView === Constants.EDITOR_VIEW ? this.get_main_function_call() + ";" + code : code
		this.expected_solution = expected_solution
		this.solve_in_server_function = solve_in_server_function
		this.level_number = level_number
    }


	get_main_function_call(){
        const game_blocks = this.blocks.filter(element => element.is_game_block)
        const game_blocks_id = game_blocks.map(obj => obj._id)
        const blocks_id = this.blocks.map(obj => obj._id)
		if(blocks_id.some((element) => Constants.board_and_score_conditions.includes(element))){
            return "main("+ game_blocks_id.join(',') + Constants.board_and_score
        }
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
			return `**${Constants.COMPILATION_ERROR}** - if iteration must be inside repeat block`
		}
		return `**${Constants.COMPILATION_ERROR}** - ${error.message}`
    }

	validate_arguments(blocks, block_id, args) {
		const block = blocks.filter(obj => obj._id === block_id)[0]
		// all the commands we write in the code are simple one that have only one line
		const arguments_type = block.arguments_type[0]
		if(arguments_type.length > args.length){
			throw new Error(`missing arguments in command "${block_id}"`)
		}
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

	checkSolution(){}

	// The function is called after the animation is finished and shows the user feedback on the code he wrote
    showModel(solution, message_from_sence){
		const information_on_soultion = this.checkSolution(solution, message_from_sence);
		if (information_on_soultion.compare)
		{
			this.solve_in_server_function()
		}
      setTimeout(() => {
        const gameBoard = createRoot(document.getElementById('model') );
        const model = <CodeModal level_number={this.level_number} text={this.leftSideView === "blocks" ? this.code : ""} message = {information_on_soultion.message} compare={information_on_soultion.compare} best_score={information_on_soultion.best_score} back={this.back_to_levels} next_level={this.next_level} retry_level={this.retry_level} gameSence={this.gameSence} gameBoard={gameBoard}/>
        gameBoard.render(model);
        }, 500);   
    }
    

	async if_infinite_code(){
        var bb = new Blob([ this.get_blocks_game_empty_functions() + this.code + "postMessage('done')"], {
            type: 'text/javascript'
        });
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

            }, 400);
        });
    }
}