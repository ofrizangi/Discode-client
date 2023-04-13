import React from 'react';
import Phaser from 'phaser';

import DancePlayerScene from '../../scenes/DancePlayerScene';
import MazeScene from '../../scenes/MazeScene';

// import setGame from '../../runSimulation/codeRun'

const {setGame} =  require('../../runSimulation/CodeRunner')

function Game(props) {

  const gameSences = new Map([
    ['dancer', DancePlayerScene],
    ['maze', MazeScene],
    ])


    const config = {
        type: Phaser.AUTO,
        width: 600,
        height: 500,
        title: 'Game',
        pixleArt: false,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 }
            }
        },
    }
   
    
    function usePhaserGame(config) {
        const phaserGameRef = React.useRef(null);
        React.useEffect(() => {
          if (phaserGameRef.current) {
            return;
          }
          phaserGameRef.current = new Phaser.Game(config);

          phaserGameRef.current.scene.add(props.game_name, gameSences.get(props.game_name));
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


