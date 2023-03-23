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
    const game = new Phaser.Game(config)
    
    return (
        <div id="game-content">

        </div>
    ) 
}
export default DancePlayer;


