import { color } from 'framer-motion'
import Phaser from 'phaser'
import ScoreLabel from './ui/SorceLabel'
import { object, string } from 'prop-types'
import { checkMaxIfStatementsInShader } from 'pixi.js'

const BACKGROUND = 'background'
const CAR = "car"
const STAR = 'star'
const BOMB = 'bomb'
const NO_ENTRY = 'no_entry'
const PAUSE = "pause"
const STOP = "stop"

export default class StarsQuestScene extends Phaser.Scene
{
    constructor()
	{
		super('starsQuest')
		this.board = undefined
		this.player = undefined
		this.stars = undefined
		this.bombs = undefined
		this.no_entrys = undefined
		this.scoreLabel = undefined
		this.legend = undefined
		this.gameOver = false
		this.version = 0
		

		this.typeStars = new Map([
			[1,Phaser.Display.Color.GetColor(123,104,238)],
			[2,Phaser.Display.Color.GetColor(30,144,255)],
			[3,Phaser.Display.Color.GetColor(138,43,226)],
			[4,Phaser.Display.Color.GetColor(135,206,235)],
			[5,Phaser.Display.Color.GetColor(32,178,170)],
			[6,Phaser.Display.Color.GetColor(0,255,127)]
		])
		
		this.timeDrive = new Map([
			[0,2000],
			[90,2000],
			[180,2054.4],
			[270,2054.2]
		])
		this.angles = new Map([
			["right",90],
			["left",-90],
		])
		this.bombs_scale = new Map([
			[-2,0.11],
			[-4,0.14],
		])
	}

	preload()
	{
		this.load.image(CAR, 'assets/animations/car1.png')
		this.load.image(BACKGROUND,'assets/textures/StarsQuest/block.png')
		this.load.image(STAR,'assets/textures/StarsQuest/star.png')
		this.load.image(BOMB,'assets/textures/StarsQuest/bomb.png')
		this.load.image(NO_ENTRY,'assets/textures/StarsQuest/no_entry.png')
		this.load.image(PAUSE, 'assets/textures/pause.png')
		this.load.image(STOP, 'assets/textures/stop.png')

    }

	initialization_objects(){
		this.physics.resume()
	
		this.stop_bool = false
		this.start = true
		this.gameOver = false
		
	
	}

	destroy_objects(){




	}
    create(data)
	{  
		this.board_data = data.board_data
		this.best_score =  data.best_score
		// new TileSprite(scene, x, y, width, height, textureKey [, frameKey])
		//width =265*0.3 =79.5 height=264*0.3=79.2
		this.board = this.add.tileSprite(0,35,265*6,264*6,BACKGROUND).setScale(0.3).setOrigin(0,0)
		this.scoreLabel = this.createScoreLabel(0, 5, 0,  this.best_score)
		this.player = this.createPlayer()

		this.initialization_objects()

		// this.legend = this.createLegend(0, 515)

		this.pauseBtn = this.add.sprite(400, 0, PAUSE).setInteractive().setScale(0.065).setOrigin(0)
		this.stopBtn = this.add.sprite(440, 0, STOP).setInteractive().setScale(0.2).setOrigin(0)
		this.createObjects()
		this.physics.world.on('worldbounds', this.collide_wall, this);
        this.physics.add.collider(this.player, this.no_entrys, this.collide_no_entrys, null, this)
        this.physics.add.overlap(this.player, this.stars, this.collectScore, null, this)
		this.physics.add.overlap(this.player, this.bombs, this.collectScore, null, this)

		this.scene.pause();
	
		this.pauseBtn.on('pointerdown', function () {
			//console.log('button_pause clicked');
			this.scene.sendToBack('starsQuest')
			this.scene.pause('starsQuest')
			this.action_list.splice(0, this.number_action)
			////console.log(this.number_action, this.action_list)
			this.scene.launch('pause',{'name':'starsQuest','action_list':this.action_list})
		},this);

		this.stopBtn.on('pointerdown', function () {
			//console.log('button_stop clicked')
			this.stop_bool = true
			this.scene.pause('starsQuest')
			//console.log("version: ", this.version)
			
			
		},this);

		this.events.on('pause', function (data) {
			//console.log("pause")
			this.pauseBtn.setVisible(false)
			this.stopBtn.setVisible(false)
			this.version +=1
			//console.log("version:", this.version)
			if(this.stop_bool){
				var message = "to_check"
				this.hitBomb(this.player, 0, message,this.version)
			}
			////console.log("this.version",  this.version)
	        }, this)

		this.events.on('resume', (scene, data) => {
			//console.log("resume")
			this.action_list = data.list
			this.pauseBtn.setVisible(true)
			this.stopBtn.setVisible(true)
			////console.log(this.action_list)
			// this.gameOver = false
			if (data.runner != undefined){
				this.runner = data.runner
				this.full_list = data.list
			}
			this.runGame(this.action_list)
			
		},this);

		
	}



	createPlayer()
	{
		const player = this.physics.add.sprite(39.75, 39.6+35, CAR).setScale(0.03)
	    player.setCollideWorldBounds(true)
		player.setSize(player.width,player.width)
		this.physics.world.setBounds(0, 35, 477, 475.2)
		player.body.onWorldBounds = true;

		return player
	}3

	create_child(i,j ,key, data_child){
		return this.add.sprite(39.75 + j*79.5, 39.6 +35+i*79.2, key).setName(data_child)
	}

	createObjects()
	{
		this.stars = this.physics.add.group()
		this.bombs = this.physics.add.group()
		this.no_entrys = this.physics.add.staticGroup()

		for (let i = 0; i <6; i++){
			for (let j = 0; j <6; j++){
				let data_child = this.board_data[i][j]
				if(data_child == "*"){
					this.no_entrys.create(39.75 +  j*79.5, 39.6 + 35 + i*79.2, NO_ENTRY).setScale(0.03).refreshBody()
				}
				else if(data_child > 0){
					let new_child = this.create_child(i,j ,STAR, data_child)
					new_child.setScale(0.1+data_child*0.03)
					new_child.setTint(this.typeStars.get(data_child))
					this.stars.add(new_child)
				}
				else if (data_child < 0){
					let new_child = this.create_child(i,j ,BOMB, data_child)
					new_child.setScale(this.bombs_scale.get(data_child))
					this.bombs.add(new_child)
				}
			}
		}
	}



	
	collide_wall()
	{

		this.scoreLabel.setScore(0)
		this.physics.pause()
		this.version+=1
		this.hitBomb(this.player, 0, "Game Over - you collided with a wall\n", this.version)
		////console.log("Game Over - you collided with a wall\n")
		
	}

	collide_no_entrys()
	{
		this.scoreLabel.setScore(0)
		this.physics.pause()
		this.version+=1
		this.hitBomb(this.player, 0, "Game Over - you can't enter there\n", this.version)
		////console.log("Game Over - you can't enter there\n")
		
	}

	collectScore(player, object)
	{
		//console.log("overlap")
        // The two parameters passed to disableBody() tells Phaser to disable and hide the GameObject.
		//object.disableBody(true, true)
		object.visible = false
		object.body.enable = false
		this.scoreLabel.add(object.name)
	}

	createScoreLabel(x, y, score, best_score)
	{
		const style = { fontSize: '17px', fill: '#000000' }
		const label = new ScoreLabel(this, x, y, score, best_score, style)

		this.add.existing(label)

		return label
	}


	createLegend(x,y){
		const style = { fontSize: '32px', fill: '#FFFAFA' }
		var text = this.add.text(x,y, "Legend:", style);

		for (let i = 1; i <= 6; i++){
			// ////console.log(i)
			let x_ = 39.75 +  (i-1)*79.5
			// ////console.log(x_,y)

			let star = this.add.image(x_, y+35, STAR)
			star.setScale(0.1+i*0.03)
			star.setTint(this.typeStars.get(i))
			let text_ = this.add.text(x_,y+35, i, {font: "16px Arial", fill: "#ffffff"}).setOrigin(0.5,0.5);
		}

	
		let star1 = this.add.image( 39.75 +  0*79.5 , y+50, BOMB)
		star1.setScale(this.bombs_scale.get(-2))
		let star2 = this.add.image( 39.75 +  1*79.5 , y+50, BOMB)
		star2.setScale(this.bombs_scale.get(-4))

		let text1_ = this.add.text(39.75 +  0*79.5,y+10, -2, {font: "bold 20px Arial ", fill: "#000000"}).setOrigin(0.5,0.5);
		let text2_ = this.add.text(39.75 +  1*79.5 ,y+10, -4, {font: "bold 20px Arial", fill: "#000000"}).setOrigin(0.5,0.5);

	}


	//width =265*0.3 =79.5 height=264*0.3=79.2
	drive(player){
		if(player.angle === 0){
			player.setVelocityY(0)
			player.setVelocityX(40)
		}
		else if(player.angle === 90){
			player.setVelocityX(0)
			player.setVelocityY(40)
		}
		else if(player.angle === -180){
			player.setVelocityY(0)
			player.setVelocityX(-40)
		}
		else if(player.angle === -90){
			player.setVelocityX(0)
			player.setVelocityY(-40)
		}
	}

	turn(player, dirction){
		player.angle += this.angles.get(dirction)
		////console.log(this.player.angle)
	}


	stop(player){
		player.setVelocityY(0)
		player.setVelocityX(0)
	}
	//func-action
	newAction(func, time, dirction,number_action, version){
		setTimeout(() => {
			if(this.scene.isPaused() === false && this.version === version){
				if (this.gameOver === false){
					this[func](this.player,dirction)
				}
				else{
					this.stop(this.player)
				}
				this.number_action = number_action+1
			}
		  }, time);
	} 


	runGame(actionsList){
		var duration = 0
		this.len = actionsList.length
		////console.log("len:", this.len)
		let i = 0;
		for ( ; i < this.len; i++) {
			if (actionsList[i].name === "drive"){
				////console.log(this.version)
				this.newAction(actionsList[i].name,duration,undefined, i, this.version)
				duration = duration + this.timeDrive.get(this.player.angle)
			}
			else {
				this.newAction(actionsList[i].name,duration, actionsList[i].arg,i, this.version)
				duration = duration + 5
			}
		}
		this.newAction("stop", duration, undefined, i, this.version)
		this.hitBomb(this.player, duration,undefined, this.version)
	}


	restart_func(){
		//console.log("restart_func")
		// if (this.scoreLabel.getScore()>this.best_score){
		// 	this.best_score = this.scoreLabel.getScore()
		// }
		// if (version = this.version){
			// this.time.delayedCall(1000, function() {
				
				//console.log(this.stars.getChildren())
				this.player.x = 39.75
				this.player.y =39.6+35
				this.player.angle = 0 
				this.initialization_objects()
				// this.action_list = this.full_list
				this.scoreLabel.setScore(0)

				this.stars.getChildren().forEach(function(star) {
					star.visible = true
					star.body.enable = true
					//console.log(star.body.enable)
				  }, this);
				  this.bombs.getChildren().forEach(function(bomb) {
					bomb.visible = true
					bomb.body.enable = true
					
				  }, this);

				 if(this.stop_bool === false){
					this.scene.pause()
				 }
				
		// }, [], this);
		//}
		
		
	  }


	async hitBomb(player, time, message, version)
	{
		setTimeout(() => {
		
		
			////console.log("this.gameOver", this.gameOver , "this.version" ,this.version, "version",version)
			if (this.gameOver === false && this.version === version){
				//console.log("in hitBomb2")
				//console.log(time, message, version)
				this.gameOver = true
				// this.physics.pause()
				
				this.runner.showModel(this.scoreLabel.getScore(),message)
				this.restart_func()
			}
		  }, time+1000);
		
	}
}