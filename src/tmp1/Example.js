import React from 'react';
import Phaser from 'phaser';


import GameScene from './GameScene';


function Example() {

    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 }
            }
        },
        scene: [GameScene]
    }


    const createCanvas = function () {
        const game = new Phaser.Game(config)
    }

    return (
        <div id="game-content">
            {createCanvas()}
        </div>
    ) 
}
export default Example;


