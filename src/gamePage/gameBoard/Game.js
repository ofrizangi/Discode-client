import React from 'react';
import Phaser from 'phaser';

import DancePlayerScene from '../../scenes/DancePlayerScene';
import StarsQuestScene from '../../scenes/StarsQuestScene';



function Game(props) {

  const gameSences1 = new Map([
    ['dancer', {"scene":DancePlayerScene, width:600, height:500}],
    ['starsQuest', {"scene":StarsQuestScene, width:477, height:475.2+35+70}],
    ])


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
        

          phaserGameRef.current.scene.start(props.game_name, props.data);

          props.setGameSence(phaserGameRef.current.scene)

          return () => {
            phaserGameRef.current.destroy(true);
            phaserGameRef.current = null;
          };
        }, [] /* only run once; config ref elided on purpose */);
        return phaserGameRef.current;
      }
      const game = usePhaserGame(config)

    return (
        <div id="game-content"> </div>
    ) 
}
export default Game;


