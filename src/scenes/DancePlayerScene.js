import Phaser from 'phaser'

import * as Constants from './../constants';

const PLAYER_KEY = 'player'
const BACKGROUND_KEY = 'background'
const PAUSE = "pause"
const STOP = "stop"
const SLIDE_LEFT = "slide left"
const SLIDE_RIGHT = "slide right"
const STEP = 0.7
export default class DancePlayerScene extends Phaser.Scene
{
    constructor()
	{
		super(Constants.DNACER_GAME)
        this.player = undefined	
	}

	/*
	This function is called first. It is responsible for loading all the required assets before the game starts
	*/
	preload(){
		this.load.image(BACKGROUND_KEY, 'assets/textures/background-dance-robot.png')
		this.load.image(PAUSE, 'assets/textures/buttons/pause.png')
		this.load.image(STOP, 'assets/textures/buttons/stop.png')

		this.load.spritesheet(PLAYER_KEY, 'assets/animations/player.png',{
			frameWidth: 110,
			frameHeight: 128			
			})
	}

	/*
	Once the preload function has finished loading all the assets, the create function is called.
	This function is responsible for setting up the initial state of the game,
	initializing game objects, and performing any necessary setup tasks. It is called only once.
	*/
    create(){  
        this.add.image(0, 0, BACKGROUND_KEY).setScale(1.03,1.03).setOrigin(0)
		this.pauseBtn = this.add.sprite(290, 10, PAUSE).setInteractive().setScale(0.065).setOrigin(0)
		this.stopBtn = this.add.sprite(330, 10, STOP).setInteractive().setScale(0.2).setOrigin(0)
        this.player = this.createPlayer()
		
		this.scene.pause();

		this.player.on('animationcomplete', function (animation) {
			this.nextAnimation = this.actionsList.shift();
			if (this.nextAnimation) {
				this.player.play(this.nextAnimation);
				}
			else{
				this.scene.pause()
				this.is_run=false
				this.gameOver()
			}
		},this );

		this.pauseBtn.on('pointerdown', function () {
			this.scene.sendToBack(Constants.DNACER_GAME)
			this.scene.pause(Constants.DNACER_GAME)
			this.scene.launch('pause',{'name': Constants.DNACER_GAME, x:290, y:10})
		  },this);

		  this.stopBtn.on('pointerdown', function () {
			this.stop_bool = true
			this.stopBtnClicked = true
			this.scene.pause(Constants.DNACER_GAME)
		  },this);

		this.events.on('pause', function (data) {
			this.is_run = false
			this.pauseBtn.setVisible(false)
			this.stopBtn.setVisible(false)
			if(this.stop_bool){
				this.gameOver()
			}
        }, this)

		this.events.on('resume', (scene, data) => {
			if (data.runner !== undefined){
				this.runner = data.runner
				this.originalActionsList = [...data.list]
				this.actionsList = data.list
				this.nextAnimation= this.actionsList.shift()
				if (this.nextAnimation){
					// start action list
					this.player.play(this.nextAnimation);
				}
				else {
					this.scene.pause()
					this.gameOver()
				}
			}
			this.is_run = true
			this.pauseBtn.setVisible(true)
			this.stopBtn.setVisible(true)
		});
		
	}
	

	createPlayer(){
		
        const player = this.physics.add.sprite(189, 155, PLAYER_KEY).setScale(1.5)
		// the player won't be able to run outside of this area - according configrition
		player.setCollideWorldBounds(true)
		this.physics.world.setBounds(42, 0, 286.8, 370.8)
		player.body.onWorldBounds = true;


		this.anims.create({
			key: 'stop',
			frames: [ { key: PLAYER_KEY, frame: 0 } ],
			frameRate: 20
		})
		this.anims.create({
			key: 'jump with hands',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { start: 16, end: 23}),
			duration: 800,
			repeat: 0,
		})
		this.anims.create({
			key: 'jump without hands',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { frames: [ 16, 17,20, 21,22,23 ] }),
			duration: 800,
			repeat: 0
		})
		this.anims.create({
			key: 'swing right',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { start: 35, end: 38}),
			duration: 600,
			repeat: 0

		})
		this.anims.create({
			key: 'swing left',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { frames: [32,33,34,38] }),
			duration: 600,
			repeat: 0

		})
		this.anims.create({
			key: 'turn_by left 45',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { frames: [ 8,9,10,11,10,9,8] }),
			duration: 1500,
			repeat: 0
		})
		this.anims.create({
			key: 'turn_by right 45',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, {frames: [ 12,13,14,15,14,13,12]}),
			duration: 1500,
			repeat: 0
		})
		this.anims.create({
			key: 'turn_by right 180',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { frames: [71, 64,65,66,67,66,65,64,71] }),
			duration: 1500,
			repeat: 0
		})
		this.anims.create({
			key: 'turn_by left 180',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { frames: [ 71,70,69,68,69,70,71] }),
			duration: 1500,
			repeat: 0
		})
		this.anims.create({
			key: 'turn_by left 360',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { frames: [ 71,70,69,68,67,66,65,64,71]}),
			duration: 1500,
			repeat: 0
		})
		this.anims.create({
			key: 'turn_by right 360',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { start: 64, end: 71}),
			duration: 1500,
			repeat: 0
		})
		this.anims.create({
			key: 'cartwheel',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { start: 48, end: 55}),
			duration: 1500,
			repeat: 0
		})
		this.anims.create({
			key: 'stomp right',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { start: 56, end: 58}),
			duration: 800,
			repeat: 0
		})
		this.anims.create({
			key: 'stomp left',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { start: 60, end: 62}),
			duration: 800,
			repeat: 0
		})
		this.anims.create({
			key: 'wiggle right',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { frames: [ 72,73,74,73,72]}),
			duration: 500,
			repeat: 0
		})
		this.anims.create({
			key: 'wiggle left',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { frames: [ 76,77,78,77,76]}),
			duration: 500,
			repeat: 0
		})
		this.anims.create({
			key: 'shrink',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { start: 80, end: 87}),
			duration: 800,
			repeat: 0
		})
		this.anims.create({
			key: 'slide left',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { start: 40, end: 43}),
			duration: 600,
			repeat: 0
		})
		this.anims.create({
			key: 'slide right',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { start: 44, end: 47}),
			duration: 600,
			repeat: 0
		})
        return player
	}

	/*
	After the create function is called, the update function is continuously called by Phaser in a game loop,
	Phaser aims to run the game at 60 frames per second (60 FPS). This means that the update function will
	be called approximately 60 times per second
	*/
	update(){
		if(this.nextAnimation === SLIDE_LEFT){
			this.player.x-=STEP
		}
		else if(this.nextAnimation === SLIDE_RIGHT){
			this.player.x+=STEP
		}
	}

	restart_func(){
		this.player.anims.play(STOP)
		this.player.x = 189
		this.player.y = 155
		if(this.stop_bool === false){
			this.scene.pause()
		}
		this.stop_bool = false
	}

	gameOver(){
		this.runner.showModel(this.originalActionsList)
	}
	
}