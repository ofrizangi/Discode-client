
import CodeModal from '../../alerts/CodeModal'
import { createRoot } from 'react-dom/client';
import * as Constants from '../../constants';

export default class BaseRunner {

    constructor(code,back_to_levels, next_level, gameSence, blocks, leftSideView){
        this.back_to_levels = back_to_levels
        this.next_level = next_level
        this.code = code
        this.actionsList = []
        this.compareSolution = {}
        this.gameSence = gameSence
		this.blocks = blocks
		this.leftSideView = leftSideView
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
  
  
    showModel(){
      setTimeout(() => { 
        const gameBoard = createRoot(document.getElementById('model') );
        console.log(this)
        const model = <CodeModal text={this.leftSideView === "blocks" ? this.code : ""} message = {this.compareSolution.message} compare={this.compareSolution.compare} back={this.back_to_levels} next_level={this.next_level}/>
        gameBoard.render(model);
        },1000);   
    }
    
    runSim(game_name, actionsList) {
      	this.gameSence.resume(game_name, {list:actionsList, runner:this})
    }

}