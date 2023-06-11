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


	function getRandomData(data_board){
        
        if (data_board && data_board[0] && data_board[0][0] && data_board[0][0] === "no_data"  ){

            let posotive_values = [0,1,2,3,4,5,6]
            let other_values = ["*",-2,-4,0]

            let numbers_rows = data_board.length
            let numbers_cols = data_board[0].length
            let arr = [];
            for (let i = 0; i < numbers_rows; i++) {
                arr[i] = [];
                for (let j = 0; j < numbers_cols; j++) {
                    if (Math.random() < 0.8 || (i===0 && j===1)|| (i===1 && j===0)) {
                        arr[i][j] = posotive_values[Math.floor(Math.random() * posotive_values.length)]
                    }
                    else {
                        arr[i][j] = other_values[Math.floor(Math.random() * other_values.length)]
                    }
                }
            }
            arr[0][0] = 0
            data_board = arr;
        }
        return data_board
    }


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
		const data = getRandomData(props.data)
        phaserGameRef.current.scene.start(props.game_name, {board_data:data,best_score:props.best_score});
		props.setDataBoard(data)

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


