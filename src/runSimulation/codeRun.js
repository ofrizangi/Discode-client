
import CodeModal from '../alerts/CodeModal'
import { createRoot } from 'react-dom/client';

const {jump,swing,cartwheel,stomp,wiggle,shrink,slide,turn,restartList, getActionsList} =  require('../scenes/dancePlayer/writeActions')


const run = () => {
  var game;
  var code_;

const runCode = function(code){
    restartList()
    eval(code)
    runSim()
    code_ = code
    

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
    const gameBoard = createRoot(document.getElementById('model') );
    const model = <CodeModal text={code_} />
    gameBoard.render(model);
}
  const setGame = function(newGame){game = newGame}
  const runSim = function() {
    game.resume('game-scene', {list:getActionsList(), function:ShowModel}) 
    //console.log(game.isActive('game-scene'))
  }



return {
    runCode,
    setGame,
};

}
export const {runCode,setGame} = run();
