import Phaser from 'phaser'
import actions from './actions.json';
import { getToken } from "../userManagment/authorization";


const PLAYER_KEY = 'player'
const BACKGROUND_KEY = 'background'
const LINE = "line"

   
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

		this.runGame()
	}
	
	createLine()
	{
		const lines = this.physics.add.staticGroup()
        // setScale - ground is 400*32, we need 800*64 - we need this platform to span the full width of our game.
        // refreshBody - The call to refreshBody() is required because we have scaled a static physics body, so we have to tell the physics world about the changes we made.
		lines.create(300, 340, LINE).refreshBody()

		// platforms.create(600, 400, GROUND_KEY).
		// platforms.create(50, 400, GROUND_KEY)
		// platforms.create(750, 220, GROUND_KEY)
        return lines
	}

    // createLine(){
	// 	const line = this.add.sprite(300, 340, LINE)
	// 	this.physics.add.existing(line, true)
      
	// 	return line
	// }

	createPlayer()
	{
		
        const player = this.physics.add.sprite(300, 240, PLAYER_KEY)
		player.setBounce(0.2)

        // the player won't be able to run outside of this area - according configrition
	    player.setCollideWorldBounds(true)
		player.setScale(1.5)

		this.anims.create({
			key: 'stop',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { start: 62, end: 62}),
			frameRate: 10,
			repeat: -1
		})

		this.anims.create({
			key: 'littleJump',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { start: 0, end: 7}),
			frameRate: 10,
			repeat: -1
		})
		this.anims.create({
			key: 'helfTurn',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { start: 8, end: 15}),
			frameRate: 10,
			repeat: -1
		})

		this.anims.create({
			key: 'bigJump',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { start: 16, end: 23}),
			frameRate: 10,
			repeat: -1
		})

		this.anims.create({
			key: 'helfTurnWithHands',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { start: 24, end: 31}),
			frameRate: 10,
			repeat: -1
		})
		this.anims.create({
			key: 'bendingDownToRight',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { start: 32, end: 34}),
			frameRate: 5,
			repeat: -1
		})
		this.anims.create({
			key: 'bendingDownToLeft',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { start: 35, end: 38}),
			frameRate: 5,
			repeat: -1
		})
		this.anims.create({
			key: 'bendingDownToRightAndLeft',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { start: 32, end: 39}),
			frameRate: 5,
			repeat: -1
		})
		this.anims.create({
			key: 'handsToRight',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { start: 40, end: 43}),
			frameRate: 5,
			repeat: -1
		})
		this.anims.create({
			key: 'handsToLeft',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { start: 44, end: 47}),
			frameRate: 5,
			repeat: -1
		})
		this.anims.create({
			key: 'handsToLeftAndRight',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { start: 40, end: 47}),
			frameRate: 5,
			repeat: -1
		})
		this.anims.create({
			key: 'spinOnOnHand',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { start: 48, end: 55}),
			frameRate: 5,
			repeat: -1
		})
		this.anims.create({
			key: 'handAndFootToLeft',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { start: 56, end: 58}),
			frameRate: 5,
			repeat: -1
		})
		this.anims.create({
			key: 'handAndFootToRight',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { start: 60, end: 62}),
			frameRate: 5,
			repeat: -1
		})
		this.anims.create({
			key: 'handAndFootToRightAndLeft',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { start: 56, end: 63}),
			frameRate: 5,
			repeat: -1
		})
		this.anims.create({
			key: 'turnToLeft',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { start: 64, end: 71}),
			frameRate: 5,
			repeat: -1
		})
		this.anims.create({
			key: 'turnToRight',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { start: 71, end: 64}),
			frameRate: 5,
			repeat: -1
		})
		this.anims.create({
			key: 'roundWithFunnyFace',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { start: 72, end: 79}),
			frameRate: 5,
			repeat: -1
		})
		this.anims.create({
			key: 'noIdea',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { start: 80, end: 87}),
			frameRate: 5,
			repeat: -1
		})

        return player
	}


	newAction(action, time, dirction, velocity){
		setTimeout(() => {
			this.player.setVelocityX(0)
			this.player.setVelocityY(0)
			if(dirction === "horizontal"){
				this.player.setVelocityX(velocity)
			} else if (dirction === "vertical"){
				this.player.setVelocityY(velocity)
			}
			console.log(this.player.body.velocity)
			this.player.anims.play(action, true)

			console.log(time);
		  }, time);
	}   

	runGame(){

		var duration = 0
		for (var action  of actions) {
			this.newAction(action.action, duration, action.dirction, action.velocity)
			duration = duration + action.Duration
	   }

	   this.hitBomb(this.player,duration )


	}

    update()
	{
		// console.log(this.player.body.velocity)
	}
   
    

    async hitBomb(player, time)
	{
        
		setTimeout(() => {
			this.physics.pause()
			// player.setTint(0xff0000)
			player.anims.play('stop')
			console.log(time);

		  }, time);
	}

	async getActions(){
		const requestOptions = {
			method: 'GET',
			headers: { 'Authorization': 'Bearer ' + getToken() },
		};
		// const response = await fetch(`${Constants.SERVER_API}/games/getAll`, requestOptions)
		// if (response.ok){
		// 	return await response.json();
		// }
	}
	
    
}