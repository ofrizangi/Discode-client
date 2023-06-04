import Phaser from 'phaser'


const PLAYER_KEY = 'player'
const BACKGROUND_KEY = 'background'
const LINE = "line"
const LINE_A = "line2"
const PAUSE = "pause"
const STOP = "stop"

export default class DancePlayerScene extends Phaser.Scene
{
    constructor()
	{
		super('dancer')
        this.player = undefined
        this.gameOver = false
		this.gameIsPaused = false
		this.version = -1
		

	}

	// Phaser will automatically look for this function when it starts and load anything defined within it.
	preload()
	{
		// load the assets we need for our game.
		this.load.image(BACKGROUND_KEY, 'assets/textures/background-dance-robot.png')

		this.load.image(LINE, 'assets/textures/line.png')
		this.load.image(LINE_A, 'assets/textures/line_a.png')
		this.load.image(PAUSE, 'assets/textures/pause.png')
		this.load.image(STOP, 'assets/textures/stop.png')

		this.load.spritesheet(PLAYER_KEY, 'assets/animations/player.png',{
			frameWidth: 110,
			frameHeight: 128			
			})
	}

    create()
	{  
        // origin is center
		// const line = this.createLine()
        var image = this.add.image(0, 0, BACKGROUND_KEY).setScale(1.03,1.03).setOrigin(0)
		// console.log(image.displayWidth, image.displayHeight)
		// this.pauseBtn = this.add.sprite(5, 5, PAUSE).setInteractive().setScale(0.1).setOrigin(0)
		// this.stopBtn = this.add.sprite(50, 5, STOP).setInteractive().setScale(0.30).setOrigin(0)
		this.pauseBtn = this.add.sprite(290, 10, PAUSE).setInteractive().setScale(0.065).setOrigin(0)
		this.stopBtn = this.add.sprite(330, 10, STOP).setInteractive().setScale(0.2).setOrigin(0)
        this.player = this.createPlayer()
		
		// this.physics.add.collider(this.player, line)
		this.time_actions = new Map([
			['jump with hands', 800],
			['jump without hands', 800],
			["swing left", 600],
			['swing right', 600],
			['turn_by right 45', 1500],
			['turn_by left 45', 1500],
			['turn_by left 180', 1500],
			['turn_by right 180', 1500],
			['turn_by right 360', 1500],
			['turn_by left 360', 1500],
			['cartwheel', 1500],
			['stomp left', 800],
			['stomp right', 800],
			['wiggle left', 500],
			[ 'wiggle right', 500],
			['shrink', 800],
			['slide left', 1000],
			['slide right', 1000],
			])


		  this.pauseBtn.on('pointerdown', function () {
			console.log('button_pause clicked');
			this.scene.sendToBack('dancer')
			this.scene.pause('dancer')
			this.action_list.splice(0, this.number_action)
			console.log(this.number_action, this.action_list)
			this.scene.launch('pause',{'name':'dancer','action_list':this.action_list, x:290, y:10})
		  },this);

		  this.stopBtn.on('pointerdown', function () {
		  	this.pauseBtn.setVisible(false)
		  	this.stopBtn.setVisible(false)
			console.log('button_stop clicked')
			this.scene.pause('dancer')
			this.hitBomb(this.player, 0, this.version)

		
		  },this);

		this.events.on('pause', function (data) {
			this.pauseBtn.setVisible(false)
			this.stopBtn.setVisible(false)
			this.version +=1
			console.log("innnnnnnnnn pause")
        }, this)

		this.events.on('resume', (scene, data) => {
			if(this.version === 0){
				this.runner = data.runner
			}
			this.pauseBtn.setVisible(true)
			this.stopBtn.setVisible(true)
			console.log("resume")
			console.log(data)
			this.action_list = data.list
			console.log(this.action_list)
			this.runGame(data.list)


		});
		this.scene.pause();
	}
	

	createPlayer()
	{
		
        const player = this.physics.add.sprite(189, 155, PLAYER_KEY).setScale(1.5)
		console.log(player.width, player.height)
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
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { frames: [ 71,70,69,68,67,68,69,70,71] }),
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
			repeat: 1
		})
		this.anims.create({
			key: 'stomp right',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { start: 56, end: 58}),
			duration: 800,
			repeat: 2
		})
		this.anims.create({
			key: 'stomp left',
			frames: this.anims.generateFrameNumbers(PLAYER_KEY, { start: 60, end: 62}),
			duration: 800,
			repeat: 2
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


	newAction(action, time, number_action, version){
		
		setTimeout(() => {
			if(this.scene.isPaused() === false && this.version === version){
				console.log(number_action)
				if(action === "slide left"){
					
					this.player.setVelocityX(-40)
				}
				else if(action === "slide right" ){
					this.player.setVelocityX(40)

				}
				else{
					this.player.setVelocityX(0)
				}
				this.player.anims.play(action)
				this.number_action = number_action+1
			}
		  }, time);
	}   
 
	runGame(actionsList){
		console.log("runningggggg")
		this.physics.resume()
		var duration = 0
		this.len = actionsList.length
		console.log("len:", this.len)
		for (let i = 0; i < this.len; i++) {
			this.newAction(actionsList[i], duration, i, this.version)
			duration = duration + this.time_actions.get(actionsList[i])
	   }
	    this.hitBomb(this.player, duration, this.version)
	}	

	restart_func(){
		this.player.anims.play('stop')
		this.player.x = 189
		this.player.y = 155

	}

    async hitBomb(player, time, version)
	{
        
		setTimeout(() => {
			if (this.version === version){
				this.physics.pause()
				this.scene.pause();
				this.gameOver = true
				console.log(time)
				this.runner.showModel()
				this.version = -1

			}
		  }, time);
	}
	
	
}