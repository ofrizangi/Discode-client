import Phaser from 'phaser'
import actions from './actions.json';
import { getToken } from "../userManagment/authorization";
import {getActionsList} from './writeActions';

const PLAYER_KEY = 'player'
const BACKGROUND_KEY = 'background'
const LINE = "line"
const LINE_A = "line2"

   
export default class GameScene extends Phaser.Scene
{
    constructor()
	{
		super('game-scene')
        this.player = undefined
        this.gameOver = false
		// this.action = this.getActions()

	}

	// Phaser will automatically look for this function when it starts and load anything defined within it.
	preload()
	{
		// load the assets we need for our game.
		this.load.image(BACKGROUND_KEY, 'assets/textures/background-dance-robot.png')

		this.load.image(LINE, 'assets/textures/line.png')
		this.load.image(LINE_A, 'assets/textures/line_a.png')

		this.load.spritesheet(PLAYER_KEY, 'assets/animations/player.png',{
			frameWidth: 110,
			frameHeight: 128			
			})
        // this.load.spritesheet(PLAYER_KEY, 'assets/animations/brawler48x48.png', { frameWidth: 48, frameHeight: 48 });
	}

    create()
	{  
        // origin is center
		const line = this.createLine()

        this.add.image(300, 250, BACKGROUND_KEY).setScale(1.7,1.4)

        this.player = this.createPlayer()
		
		this.physics.add.collider(this.player, line)

		this.time_actions = new Map([
			['jump with hand', 800],
			['jump without hand', 800],
			["swing hands left", 600],
			['swing hands right', 600],
			['turn right 45', 1500],
			['turn left 45', 1500],
			['turn left 180', 1500],
			['turn right 180', 1500],
			['turn right 360', 1500],
			['cartwheel', 1500],
			['stomp to left', 800],
			['stomp to right', 800],
			['wiggle left', 300],
			[ 'wiggle right', 300],
			['shrink', 800],
			['slide left', 600],
			['slide right', 600],
			])
		this.getActions()
		//this.runGame()
	}
	
	createLine()
	{
		const lines = this.physics.add.staticGroup()


		lines.create(300, 340, LINE)
		lines.create(110, 250, LINE_A)
		lines.create(490, 250, LINE_A)

        return lines
	}



	createPlayer()
	{
		
        const player = this.physics.add.sprite(300, 240, PLAYER_KEY)

        // the player won't be able to run outside of this area - according configrition
	    player.setCollideWorldBounds(true)
		player.setScale(1.5)

		this.anims.create({
			key: 'stop',
			frames: [ { key: PLAYER_KEY, frame: 0 } ],
			frameRate: 20
		})

		this.anims.create({
			key: 'jump with hand',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { start: 16, end: 23}),
			duration: 800,
			repeat: 0,
		})
		this.anims.create({
			key: 'jump without hand',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { frames: [ 16, 17,20, 21,22,23 ] }),
			duration: 800,
			repeat: 0
		})
		this.anims.create({
			key: 'swing hands left',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { start: 35, end: 38}),
			duration: 600,
			repeat: 0

		})
		this.anims.create({
			key: 'swing hands hight',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { frames: [32,33,34,38] }),
			duration: 600,
			repeat: 0

		})
		this.anims.create({
			key: 'turn right 45',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { frames: [ 8,9,10,11,10,9,8] }),
			duration: 1500,
			repeat: 0
		})
		this.anims.create({
			key: 'turn left 45',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, {frames: [ 12,13,14,15,14,13,12]}),
			duration: 1500,
			repeat: 0
		})
		
		this.anims.create({
			key: 'turn left 180',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { frames: [71, 64,65,66,67,66,65,64,71] }),
			duration: 1500,
			repeat: 0
		})
		this.anims.create({
			key: 'turn right 180',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { frames: [ 71,70,69,68,67,68,69,70,71] }),
			duration: 1500,
			repeat: 0
		})
		this.anims.create({
			key: 'turn right 360',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { frames: [ 71,70,69,68,67,66,65,64,71]}),
			duration: 1500,
			repeat: 0
		})
		this.anims.create({
			key: 'turn left 360',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { start: 64, end: 71}),
			duration: 1500,
			repeat: 0
		})
		this.anims.create({
			key: 'cartwheel',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { start: 48, end: 55}),
			duration: 1500,
			repeat: 1
		})
		this.anims.create({
			key: 'stomp to left',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { start: 56, end: 58}),
			duration: 800,
			repeat: 2
		})
		this.anims.create({
			key: 'stomp to right',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { start: 60, end: 62}),
			duration: 800,
			repeat: 2
		})
		this.anims.create({
			key: 'wiggle left',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { start: 72, end: 73}),
			duration: 300,
			repeat: 2
		})
		this.anims.create({
			key: 'wiggle right',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { start: 76, end: 77}),
			duration: 300,
			repeat: 2
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


	newAction(action, time){
		setTimeout(() => {
			if(action === "slide left"){
				this.player.setVelocityX(40)
			}
			else if(action === "slide right" ){
				this.player.setVelocityX(-40)
			}
			else{
				this.player.setVelocityX(0)
			}
			// console.log(this.player.body.velocity)
			this.player.anims.play(action, true)

			// console.log(time);
		  }, time);
	}   
 
	runGame(actionsList){


		var duration = 0
		for (var action  of actionsList) {
			this.newAction(action, duration)
			console.log(this.time_actions.get(action))
			duration = duration + this.time_actions.get(action)
	   }
	    this.hitBomb(this.player, duration )


	}	

    update()
	{
		//this.player.anims.play("jumpWithHand", true)

		// console.log(this.player.body.velocity)
	}
   
    

    async hitBomb(player, time)
	{
        
		setTimeout(() => {
			this.physics.pause()
			this.paused = true;

			player.setTint(0xff0000)
			player.anims.play('stop')
			console.log(time);
			

		  }, time);
	}

	async getActions(){
		// const requestOptions = {
		// 	method: 'GET',
		// 	headers: { 'Authorization': 'Bearer ' + getToken() },
		// };
		// const response = await fetch(`${Constants.SERVER_API}/games/getAll`, requestOptions)
		// if (response.ok){
		// 	return await response.json();
		// }

		//this.runGame(getActionsList())
		this.runGame(actions)

	}
	
}