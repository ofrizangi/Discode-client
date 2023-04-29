import { color } from 'framer-motion'
import Phaser from 'phaser'
import ScoreLabel from './ui/SorceLabel'
import { string } from 'prop-types'
import { checkMaxIfStatementsInShader } from 'pixi.js'


const BACKGROUND = 'background'
const CAR = "car"
const STAR = 'star'
const BOMB = 'bomb'
const NO_ENTRY = 'no_entry'
   
export default class MazeScene extends Phaser.Scene
{
    constructor()
	{
		super('maze')
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

		this.dataStars = [
			{id:2 ,x:1, y:0},
			{id:6 ,x:1, y:1},
			{id:1 ,x:2, y:2},
			{id:4 ,x:3, y:3},
			{id:3 ,x:4, y:0},
			{id:2 ,x:5, y:3},
			{id:5 ,x:5, y:4},
			{id:1 ,x:4, y:5},
			{id:3 ,x:2, y:3},
			{id:6 ,x:3, y:0},
		];
		this.dataBombs = [
			{id:-10,x:0, y:2},
			{id:-10,x:1, y:2},
			{id:-10,x:3, y:1},
		]
		this.no_entry = [
			{x:2, y:4},
			{x:1, y:5},
			{x:5, y:5},
		]
		
		
		

	}

	preload()
	{
		this.load.image(CAR, 'assets/animations/car1.png')
		this.load.image(BACKGROUND,'assets/textures/maze/block.png')
		this.load.image(STAR,'assets/textures/maze/star1.png')
		this.load.image(BOMB,'assets/textures/maze/bomb.png')
		this.load.image(NO_ENTRY,'assets/textures/maze/no_entry.png')

    }
    create()
	{  
		// new TileSprite(scene, x, y, width, height, textureKey [, frameKey])
		//width =265*0.3 =79.5 height=264*0.3=79.2
		
		this.board = this.add.tileSprite(0,35,265*6,264*6,BACKGROUND).setScale(0.3).setOrigin(0,0)

		this.player = this.createPlayer()
		console.log(this.player)
		this.stars = this.createObjects(this.dataStars, STAR, true, this.typeStars)
		this.bombs = this.createObjects(this.dataBombs,BOMB, false)
		this.no_entrys = this.createNoEntey()

		this.scoreLabel = this.createScoreLabel(0, 0, 0)
		this.legend = this.createLegend(0, 515)

        this.physics.add.collider(this.player, this.no_entrys)
        this.physics.add.overlap(this.player, this.stars, this.collectScore, null, this)
		this.physics.add.overlap(this.player, this.bombs, this.collectScore, null, this)

        this.cursors = this.input.keyboard.createCursorKeys()

		this.runGame()
		this.events.on('pause', function (data) {
			console.log(data)
            console.log('Scene A paused');
        })

		this.events.on('resume', (scene, data) => {
			console.log(data)
            console.log('Scene A resumed');
			//this.runGame(data.list)
			//this.function  = data.function

		});
		//this.scene.pause();


	}

	createPlayer()
	{
		const player = this.physics.add.sprite(39.75, 39.6+35, CAR).setScale(0.03)
	    player.setCollideWorldBounds(true)
		return player
	}
	createObjects(data, key, flag, type)
	{

		const objects = this.physics.add.group({
			key: key,
			repeat: data.length - 1,
		})

		let i = 0;
		objects.children.iterate((child) => {
			let data_child = data[i]
			if (flag){
				child.setScale(0.1+data_child.id*0.03)
				child.setTint(type.get(data_child.id))
			}
			else {
				child.setScale(0.1)
			}
			child.x = 39.75 +  data_child.x*79.5
			child.y = 39.6 +35+data_child.y*79.2
			child.setName(data_child.id)
			i++;
		})
		return objects
	}

	

	collectScore(player, object)
	{
        // The two parameters passed to disableBody() tells Phaser to disable and hide the GameObject.
		object.disableBody(true, true)
		this.scoreLabel.add(object.name)
	}

	createScoreLabel(x, y, score)
	{
		const style = { fontSize: '32px', fill: '#FFFAFA' }
		const label = new ScoreLabel(this, x, y, score, style)

		this.add.existing(label)

		return label
	}


	createLegend(x,y){
		const style = { fontSize: '32px', fill: '#FFFAFA' }
		var text = this.add.text(x,y, "Legend:", style);
		for (let i = 1; i <= 6; i++){
			console.log(i)
			let x_ = 39.75 +  (i-1)*79.5
			console.log(x_,y)

			let star = this.add.image(x_, y+35, STAR)
			star.setScale(0.1+i*0.03)
			star.setTint(this.typeStars.get(i))
			let text_ = this.add.text(x_,y+35, i, {font: "16px Arial", fill: "#ffffff"}).setOrigin(0.5,0.5);
		}


	}

	createNoEntey()
	{
		const noEntey = this.physics.add.staticGroup()
        for (let i = 0; i < this.no_entry.length; i++)
		{
		let x = 39.75 +  this.no_entry[i].x*79.5
		let y = 39.6 + 35 + this.no_entry[i].y*79.2
		noEntey.create(x, y, NO_ENTRY).setScale(0.03).refreshBody()
		}

	return noEntey

	}

	//width =265*0.3 =79.5 height=264*0.3=79.2
	driveRight(player){
		// for (let i = 0; i < 79; i++)
		// {
		// 	this.player.x+=1			
		// }
		// this.player.x+=0.5
		// this.player.x+=79.5
		// this.player.x+=79.5
		// this.player.x+=79.5
		player.setVelocityX(40)
	}
	driveLeft(player){

		player.setVelocityX(-40)
	}
	stop(player){

		player.setVelocityX(0)
	}
	stop(player){

		player.setVelocityX(0)
	}
	

	newAction(func, time){
		setTimeout(() => {
			this.player.setVelocityX(0)
			this.player.setVelocityY(0)
			func(this.player)
			console.log("x",this.player.x)
		  }, time);
	} 
	

	runGame(actionsList){
		//119.25
		this.newAction(this.driveRight,0)
		this.newAction(this.stop,2054)
		//this.newAction(this.driveLeft,1000)
		// for (let i = 0; i < 5; i++)
		// {
		// 	this.driveRight()
			
		// }

		//this.physics.resume()
		// 	var duration = 0
		// 	for (var action  of actionsList) {
		// 		this.newAction(action, duration)
		// 		duration = duration + this.time_actions.get(action)
		//    }
		//     this.hitBomb(this.player, duration)
	}	




}