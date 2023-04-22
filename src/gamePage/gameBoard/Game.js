import React from 'react';
import Phaser from 'phaser';

import DancePlayerScene from '../../scenes/DancePlayerScene';
import MazeScene from '../../scenes/MazeScene';

// import setGame from '../../runSimulation/codeRun'

const {setGame} =  require('../../runSimulation/CodeRunner')

function Game(props) {

  const gameSences1 = new Map([
    ['dancer', {"scene":DancePlayerScene, width:600, height:500}],
    ['maze', {"scene":MazeScene, width:450, height:526}],
    ])

    console.log(gameSences1.get(props.game_name.scene))

    const config = {
        type: Phaser.AUTO,
        width: gameSences1.get(props.game_name).width,
        height:gameSences1.get(props.game_name).height,
        title: 'Game',
        pixleArt: false,
        physics: {
            default: 'arcade',
            arcade: {
                //gravity: { y: 300 },
                debug: true
            }
        },
        scene: [gameSences1.get(props.game_name).scene]
    }
   
    
    function usePhaserGame(config) {
        const phaserGameRef = React.useRef(null);
        React.useEffect(() => {
          if (phaserGameRef.current) {
            return;
          }
          phaserGameRef.current = new Phaser.Game(config);
          // phaserGameRef.current.canvas.width =440
          // phaserGameRef.current.canvas.height =440

          //phaserGameRef.current.scene.add(props.game_name, gameSences1.get(props.game_name).scene);
          phaserGameRef.current.scene.start(props.game_name);

          setGame(phaserGameRef.current.scene)

          return () => {
            phaserGameRef.current.destroy(true);
            phaserGameRef.current = null;
          };
        }, [] /* only run once; config ref elided on purpose */);
        return phaserGameRef.current;
      }


      const game = usePhaserGame(config)

      

    
    return (
        <div id="game-content">

        </div>
    ) 
}
export default Game;


