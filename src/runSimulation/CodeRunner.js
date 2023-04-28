
import CodeModal from '../alerts/CodeModal'
import { createRoot } from 'react-dom/client';
// import {root} from '../index'

import { get_game_level_data } from '../gamePage/gamesAPI';
const {jump,swing,cartwheel,stomp,wiggle,shrink,slide,turn,restartList, getActionsList} =  require('./writeActions')


const run = () => {
  var game;
  var code_;
  var gameBoard;
  var actionList;
  var expected_solution_
  var compareSolution
  var back_to_levels_
  var next_level_
  // const compareArrays = function(solution, expected_solution) {
  //   return JSON.stringify(solution) === JSON.stringify(expected_solution);
  // };

  const compareArrays = function(solution, expected_solution) {
    var len_solution = solution.length;
    var len_expected_solution = expected_solution.length;
    if(len_expected_solution === 0){
      return {
        'compare': true,
        'message': `Nice idea, well done\n`
    }
    }
    if(len_solution > len_expected_solution){
      return {
        'compare': false,
        'message': `Your solution contains ${len_solution - len_expected_solution} more operations than expected\n`
      };
    }
    else if(len_expected_solution > len_solution){
      return {
        'compare': false,
        'message': `Your solution contains ${len_expected_solution - len_solution} less operations than expected\n`
      };
    } 
    else {
      for (var i = 0; i < len_solution; i++) {
        if (solution[i] !== expected_solution[i]) {    
          return {
            'compare': false,
            'message': `action number ${i+1} is not corrcet\n`
          };
        }
      }
    }
    return {
      'compare': true,
      'message': `Well done\n`
    };
  }

  const runCode = function(code, expected_solution, game_name,back_to_levels, next_level){
      console.log(expected_solution)
      restartList()
      eval(code)
      actionList =  getActionsList()
      expected_solution_ = expected_solution
      compareSolution = compareArrays(actionList, expected_solution_)
      back_to_levels_ = back_to_levels
      next_level_=next_level
      runSim(game_name)
      code_ = code
      return compareSolution.compare;   
  }

  function check_runtime_errors(code){
    try {
        eval(code)
    }
    catch(e){
        if(e.message === "iteration is not defined"){
            console.log("Compilation error - if iteration must be inside repeat block")
        }
    }
  }



  const ShowModel = function(){

    setTimeout(() => { 
          //  root.render(<CodeModal text={code_} />);
      // let { compare, message } = compareArrays(actionList, expected_solution_)
      // var compare, message = compareArrays(actionList, expected_solution_)
      //console.log(compare, message)
      const gameBoard = createRoot(document.getElementById('model') );
      const model = <CodeModal text={code_} message = {compareSolution.message} compare={compareSolution.compare} back={back_to_levels_} next_level={next_level_}/>
      gameBoard.render(model);
		  },1000);

      
  }
  const setGame = function(newGame){game = newGame}
  const runSim = function(game_name) {
    game.resume(game_name, {list:actionList, function:ShowModel})
    //console.log(game.isActive('game-scene'))
  }

  return {
      runCode,
      setGame,
      
  };

}
export const {runCode,setGame} = run();
