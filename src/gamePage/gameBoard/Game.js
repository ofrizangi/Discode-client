import React from 'react';
import Phaser from 'phaser';

import DancePlayerScene from '../../scenes/DancePlayerScene';
import StarsQuestScene from '../../scenes/StarsQuestScene';
import PauseScene from '../../scenes/PauseScene';
import { useEffect, useRef } from 'react';


function Game(props) {

  const gameSences1 = new Map([
    ['dancer', {"scene":DancePlayerScene, width:370.8, height:370.8, style: 'position: absolute;top: 135pt; right:80pt;'}],
    ['starsQuest', {"scene":StarsQuestScene, width:477, height:475.2+35 , style:'position: absolute;top: 120pt; right:38pt;'}],
    ])


    const config = {
        type: Phaser.AUTO,
        width: gameSences1.get(props.game_name).width,
        height:gameSences1.get(props.game_name).height,
        canvasStyle: gameSences1.get(props.game_name).style,
        title: 'Game',
        backgroundColor: '#FFFFFF',
        pixleArt: false,
        physics: {
            default: 'arcade',
            arcade: {
                //gravity: { y: 300 },
                // debug: true
            }
        },
        scene: [gameSences1.get(props.game_name).scene, PauseScene]
    }
   
    

  const phaserGameRef = useRef(null);

  function usePhaserGame(config) {
      
      useEffect(() => {
        if (phaserGameRef.current) {
            return;
        }
        phaserGameRef.current = new Phaser.Game(config);
        console.log("game", props.data)
        phaserGameRef.current.scene.start(props.game_name, {board_data:props.data,best_score:props.best_score});

        props.setGameSence(phaserGameRef.current.scene)

        return () => {
          phaserGameRef.current.destroy(true);
          phaserGameRef.current = null;
        };
      }, [props.level] /* only run once; config ref elided on purpose */);
        return phaserGameRef.current;
    }

	const game = usePhaserGame(config)

    return (
      <div id="phaserCanvas"></div>
    );
}
export default Game;


