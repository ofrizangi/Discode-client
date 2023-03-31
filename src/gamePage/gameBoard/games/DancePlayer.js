import React from 'react';
import Phaser from 'phaser';

import DancePlayerScene from '../../../scenes/dancePlayer/DancePlayerScene';
// import setGame from '../../runSimulation/codeRun'

const {setGame} =  require('../../../runSimulation/CodeRunner')

function DancePlayer(props) {

    const config = {
        type: Phaser.AUTO,
        width: 600,
        height: 500,
        title: 'DancePlyer',
        pixleArt: false,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 }
            }
        },
        scene: [DancePlayerScene]
    }
    // game.destroy()
    
    function usePhaserGame(config) {
        const phaserGameRef = React.useRef(null);
        React.useEffect(() => {
          if (phaserGameRef.current) {
            return;
          }
          phaserGameRef.current = new Phaser.Game(config);
          // phaserGameRef.current.scene.pause('game-scene')
          setGame(phaserGameRef.current.scene)

          return () => {
            phaserGameRef.current.destroy(true);
            phaserGameRef.current = null;
          };
        }, [] /* only run once; config ref elided on purpose */);
        return phaserGameRef.current;
      }


      const game = usePhaserGame(config)
      // const game = new Phaser.Game(config);
      // game.scene.add('DancePlayerScene', DancePlayerScene, true);
      // setGame(game.scene)
      

    
    return (
        <div id="game-content">

        </div>
    ) 
}
export default DancePlayer;


