import React from 'react';
import Phaser from 'phaser';

import DancePlayerScene from '../../scenes/DancePlayerScene';


function DancePlayer() {

    const config = {
        type: Phaser.AUTO,
        width: 600,
        height: 500,
        title: 'DancePlyer',
        pixleArt: false,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: true
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
export default DancePlayer;


