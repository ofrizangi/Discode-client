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
        this.cursors = undefined
		this.gameOver = false

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

    }
    create(data)
	{  
		this.boars_data = data[0]
		this.expected_solution =  data[1]
		
		// new TileSprite(scene, x, y, width, height, textureKey [, frameKey])
		//width =265*0.3 =79.5 height=264*0.3=79.2
		this.board = this.add.tileSprite(0,35,265*6,264*6,BACKGROUND).setScale(0.3).setOrigin(0,0)
		const borders = this.create_borders()
		this.player = this.createPlayer()

		var objects = this.createObjects()
		this.stars = objects.stars
		this.bombs = objects.bobms
		this.no_entrys = objects.noEntey

		this.scoreLabel = this.createScoreLabel(0, 0, 0,  data[1])
		// this.legend = this.createLegend(0, 515)
		this.physics.add.collider(this.player, borders, this.collide_wall,null, this )
        this.physics.add.collider(this.player, this.no_entrys, this.collide_no_entrys, null, this)
        this.physics.add.overlap(this.player, this.stars, this.collectScore, null, this)
		this.physics.add.overlap(this.player, this.bombs, this.collectScore, null, this)

        this.cursors = this.input.keyboard.createCursorKeys()

		this.events.once('pause', function (data) {
			console.log('pause')
        })


		this.events.once('resume', (scene, data) => {
			this.gameOver = false
			console.log("resume")
			this.runGame(data.list)
			this.runner = data.runner
		});

		this.scene.pause();

	}
	create_borders(){
		var borderGroup = this.physics.add.group();

		var x_lept_up = 0;
		var y_lept_up = 35;
		var x_right_down = 477+0.1;
		var y_right_down = 475.2 + 35+0.1;
	
		var borderThickness = 0;
		var borderColor = 0x000000;
	
		// Top border
		var topLine = this.add.line(x_lept_up, 0, x_right_down, y_lept_up, x_lept_up, y_lept_up, borderColor).setOrigin(0).setLineWidth(borderThickness);
		borderGroup.add(topLine);
	
		// Bottom border
		var bottomLine = this.add.line(x_lept_up, 0, x_right_down, y_right_down, x_lept_up, y_right_down, borderColor).setOrigin(0).setLineWidth(borderThickness);
		borderGroup.add(bottomLine);
	
		// // Left border
		var leftLine = this.add.line(x_lept_up, 0, x_lept_up, y_right_down, x_lept_up, y_lept_up, borderColor).setOrigin(0).setLineWidth(borderThickness);
		// borderGroup.add(leftLine);
	
		// Right border
		var rightLine = this.add.line(x_lept_up, 0, x_right_down, y_right_down, x_right_down, y_lept_up, borderColor).setOrigin(0).setLineWidth(borderThickness);
		borderGroup.add(rightLine);
		this.physics.world.setBounds(x_lept_up, y_lept_up, x_right_down - x_lept_up, y_right_down - y_lept_up);
		return borderGroup



	}
	createPlayer()
	{
		const player = this.physics.add.sprite(39.75, 39.6+35, CAR).setScale(0.03)
	    player.setCollideWorldBounds(true)
		player.setSize(player.width,player.width)
		
		player.body.onWorldBounds = true;

		return player
	}

	create_child(i,j ,key, data_child){
		return this.add.sprite(39.75 + j*79.5, 39.6 +35+i*79.2, key).setName(data_child)
	}

	createObjects()
	{
		const stars = this.physics.add.group()
		const bobms = this.physics.add.group()
		const noEntey = this.physics.add.staticGroup()

		for (let i = 0; i <6; i++){
			for (let j = 0; j <6; j++){
				let data_child = this.boars_data[i][j]
				if(data_child == "*"){
					noEntey.create(39.75 +  j*79.5, 39.6 + 35 + i*79.2, NO_ENTRY).setScale(0.03).refreshBody()
				}
				else if(data_child > 0){
					let new_child = this.create_child(i,j ,STAR, data_child)
					new_child.setScale(0.1+data_child*0.03)
					new_child.setTint(this.typeStars.get(data_child))
					stars.add(new_child)
				}
				else if (data_child < 0){
					let new_child = this.create_child(i,j ,BOMB, data_child)
					new_child.setScale(this.bombs_scale.get(data_child))
					bobms.add(new_child)
				}
			}
		}
		return {stars: stars, bobms: bobms, noEntey: noEntey}
	}



	
	collide_wall()
	{

		this.scoreLabel.setScore(0)
		this.hitBomb(this.player, 0, "Game Over - you collided with a wall\n")
		console.log("warning! opps, you collid in wall\n")
		
	}

	collide_no_entrys()
	{
		this.scoreLabel.setScore(0)
		this.hitBomb(this.player, 0, "Game Over - you can't enter there\n")
		console.log("warning! opps, you collid in no entry\n")
		
	}

	collectScore(player, object)
	{
        // The two parameters passed to disableBody() tells Phaser to disable and hide the GameObject.
		//object.disableBody(true, true)
		object.visible = false
		object.body.enable = false
		this.scoreLabel.add(object.name)
	}

	createScoreLabel(x, y, score, expected_solution)
	{
		const style = { fontSize: '17px', fill: '#000000' }
		const label = new ScoreLabel(this, x, y, score, expected_solution, style)

		this.add.existing(label)

		return label
	}


	createLegend(x,y){
		const style = { fontSize: '32px', fill: '#FFFAFA' }
		var text = this.add.text(x,y, "Legend:", style);

		for (let i = 1; i <= 6; i++){
			// console.log(i)
			let x_ = 39.75 +  (i-1)*79.5
			// console.log(x_,y)

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
		console.log(this.player.angle)
	}


	stop(player){
		player.setVelocityY(0)
		player.setVelocityX(0)
	}
	
	newAction(func, time, dirction){
		setTimeout(() => {
			if (this.gameOver === false){
			console.log(func)
			this[func](this.player,dirction)
			}
			else{
				this.stop(this.player)
			}
		  }, time);
	} 


	runGame(actionsList){
		var duration = 0
		for (var action  of actionsList) {
			if (action.name === "drive"){
				this.newAction(action.name,duration)
				duration = duration + this.timeDrive.get(this.player.angle)*action.arg
			}
			else {
				this.newAction(action.name,duration, action.arg)
				duration = duration + 5
			}
		}
		this.newAction("stop", duration)
		this.hitBomb(this.player, duration)
	}


	endgame(){
		console.log("end game")
		this.time.delayedCall(1000, function() {
		this.scene.restart();
		this.player.angle = 0
		// console.log(this.player.angle)
		}, [], this);
	  }


	async hitBomb(player, time, message)
	{
       
		setTimeout(() => {
			if (this.gameOver === false){
				this.gameOver = true
				this.physics.pause()
				this.endgame()
				this.gameOver = true
				this.runner.showModel(this.scoreLabel.getScore(),message)}
		  }, time);
		
	}
}