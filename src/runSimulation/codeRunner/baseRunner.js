
import CodeModal from '../../alerts/CodeModal'
import { createRoot } from 'react-dom/client';

export default class BaseRunner {

    constructor(code, expected_solution,back_to_levels, next_level, gameSence){
        this.back_to_levels = back_to_levels
        this.next_level = next_level
        this.code = code
        this.expected_solution = expected_solution
        this.actionsList = []
        this.compareSolution = {}
        this.gameSence = gameSence
    }

    addToActionList(action){this.actionsList.push(action)}

    runcode(){
    console.lod("base")
    }

    check_runtime_errors(code){
      try {
          eval(code)
      }
      catch(e){
          if(e.message === "iteration is not defined"){
              console.log("Compilation error - if iteration must be inside repeat block")
          }
      }
    }
  
  
  
    showModel(){
      setTimeout(() => { 
        const gameBoard = createRoot(document.getElementById('model') );
        console.log(this)
        const model = <CodeModal text={this.code} message = {this.compareSolution.message} compare={this.compareSolution.compare} back={this.back_to_levels} next_level={this.next_level}/>
        gameBoard.render(model);
            },1000);
  
        
    }

    // setGame(newGame){game = newGame}
    
    runSim(game_name, actionsList) {
      console.log(this.compareSolution)
      console.log(this.actionsList)
      console.log("runsim", {list:actionsList, function:this.showModel})
      console.log(game_name, actionsList)
      this.gameSence.resume(game_name, {list:actionsList, runner:this})
    }




}