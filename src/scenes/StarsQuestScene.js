import Phaser from 'phaser'
import ScoreLabel from './ui/SorceLabel'

import * as Constants from './../constants';

const BACKGROUND = 'background'
const CAR = "car"
const PAUSE = "pause"
const STOP = "stop"
const COLLISION_SOUND ='collision_sound'
const COLLECT_STAR_SOUND ='collect_star_sound'
const COLLECT_BOMB_SOUND ='collect_bomb_sound'

export const WALL = 'wall'
export const STAR = 'star'
export const BOMB = 'bomb'
export const NO_ENTRY = 'no_entry'
export const GO_RIGHT = "right"
export const GO_LEFT = "left"
export const GO_FRONT = "front"
export const NO_ENTRY_SIGN = "*"
export const NO_ENTRY_MESSAGE = "you can't enter there\n"
export const WALL_MESSAGE = "you collided with a wall\n"
export const BOARD_SIZE = 6


export default class StarsQuestScene extends Phaser.Scene
{
    constructor()
	{
		super(Constants.STARS_QUEST_GAME)
		this.board = undefined
		this.player = undefined
		this.stars = undefined
		this.bombs = undefined
		this.no_entrys = undefined
		this.scoreLabel = undefined
		
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
			[GO_RIGHT,90],
			[GO_LEFT,-90],
		])
		this.bombs_scale = new Map([
			[-2,0.11],
			[-4,0.14],
		])
	}

	preload(){
		this.load.image(CAR, 'assets/animations/car.png')
		this.load.image(BACKGROUND,'assets/textures/StarsQuest/block.png')
		this.load.image(STAR,'assets/textures/StarsQuest/star.png')
		this.load.image(BOMB,'assets/textures/StarsQuest/bomb.png')
		this.load.image(NO_ENTRY,'assets/textures/StarsQuest/no_entry.png')
		this.load.image(PAUSE, 'assets/textures/buttons/pause.png')
		this.load.image(STOP, 'assets/textures/buttons/stop.png')
		this.load.audio(COLLISION_SOUND, 'assets/sound/collision_sound.mp3')
		this.load.audio(COLLECT_STAR_SOUND, 'assets/sound/collect_star.mp3')
		this.load.audio(COLLECT_BOMB_SOUND, 'assets/sound/collect_bomb.mp3')
    }

	initialization_objects(){
		this.physics.resume()
		this.stop_bool = false
		this.start = true
		this.pauseBtnClicked = false
		this.stopBtnClicked = false
		this.index = 0
		this.is_run = false
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

		this.pauseBtn = this.add.sprite(400, 0, PAUSE).setInteractive().setScale(0.065).setOrigin(0)
		this.stopBtn = this.add.sprite(440, 0, STOP).setInteractive().setScale(0.2).setOrigin(0)

		this.createObjects()
		this.carCollisionSound = this.sound.add(COLLISION_SOUND);
		this.carCollectStarSound = this.sound.add(COLLECT_STAR_SOUND);
		this.carCollectBombSound = this.sound.add(COLLECT_BOMB_SOUND);

		// this.physics.world.on('worldbounds', this.collide_wall, this);
        this.physics.add.collider(this.player, this.no_entrys, this.collide_no_entrys, null, this)
        this.physics.add.overlap(this.player, this.stars, this.collectScore, null, this)
		this.physics.add.overlap(this.player, this.bombs, this.collectScore, null, this)

		this.scene.pause();
	
		this.pauseBtn.on('pointerdown', function () {
			this.scene.sendToBack(Constants.STARS_QUEST_GAME)
			this.scene.pause(Constants.STARS_QUEST_GAME)
			this.scene.launch('pause', {'name':Constants.STARS_QUEST_GAME, x:400, y:0})
		},this);

		this.stopBtn.on('pointerdown', function () {
			this.stop_bool = true
			this.stopBtnClicked = true
			this.scene.pause(Constants.STARS_QUEST_GAME)
		},this);


		this.events.on('pause', function (data) {
			this.is_run = false
			this.pauseBtn.setVisible(false)
			this.stopBtn.setVisible(false)
			if(this.stop_bool){
				this.gameOver(Constants.SCENE_MESSAGE)
			}
	        }, this)

		this.events.on('resume', (scene, data) => {
			
			if (data.runner !== undefined){
				this.runner = data.runner
				this.action_list = data.list
			}
			this.is_run = true
			this.pauseBtn.setVisible(true)
			this.stopBtn.setVisible(true)			
		},this);
	}

	createPlayer(){
		const player = this.physics.add.sprite(39.75, 39.6+35, CAR).setScale(0.03)
		player.setDepth(2)
		return player
	}

	create_child(i,j ,key, data_child){
		return this.add.sprite(39.75 + j*79.5, 39.6 +35+i*79.2, key).setName(data_child)
	}

	createObjects(){
		this.stars = this.physics.add.group()
		this.bombs = this.physics.add.group()
		this.no_entrys = this.physics.add.staticGroup()

		for (let i = 0; i <BOARD_SIZE; i++){
			for (let j = 0; j <BOARD_SIZE; j++){
				let data_child = this.board_data[i][j]
				if(data_child === NO_ENTRY_SIGN){
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
	
	check_collide_wall(){
		//width =79.5 -> 477-79.5/2=435.25
		//height==79.2 -> 475.2+35-79.2/2=467.6
		if (this.player.x < 38 || this.player.x >438.5   || this.player.y < 73.5 || this.player.y > 471.5 ){
			this.pauseBtn.setVisible(false)
			this.stopBtn.setVisible(false)
			this.carCollisionSound.play();
			this.is_run = false
			this.physics.pause()
			this.gameOver(WALL_MESSAGE)		
		}
		
	}

	collide_no_entrys(){
		this.pauseBtn.setVisible(false)
		this.stopBtn.setVisible(false)
		this.carCollisionSound.play();
		this.is_run = false
		this.physics.pause()
		this.gameOver(NO_ENTRY_MESSAGE)
		
	}

	collectScore(player, object){
		if(object.name > 0){
			this.carCollectStarSound.play();
		}
		else{
			this.carCollectBombSound.play();
		}
		object.visible = false
		object.body.enable = false
		this.scoreLabel.add(object.name)
	}

	createScoreLabel(x, y, score, best_score){
		const style = { fontSize: '17px', fill: '#000000' }
		const label = new ScoreLabel(this, x, y, score, best_score, style)
		this.add.existing(label)
		return label
	}


	update(){
		if (this.is_run){
			if (this.index>this.action_list.length-1){
				this.scene.pause()
				this.is_run=false
				this.gameOver(undefined)
				return
			}
			if(this.index < this.action_list.length && this.action_list[this.index].name === "turn" ){
				this.player.angle += this.angles.get(this.action_list[this.index].arg)
				this.index++
				return
			}
			var next_x = 39.7 + this.action_list[this.index].arg.x*79.5
			var next_y = 35+39.6+ this.action_list[this.index].arg.y*79.2
			this.check_collide_wall()
			//drive
			if(this.player.angle === 0 && this.player.x < next_x){
				this.player.x+=0.7
				return
			}
			if(this.player.angle === 90 && this.player.y < next_y){
				this.player.y+=0.7
				return
			}
			if(this.player.angle === -180 && this.player.x > next_x){
				this.player.x-=0.7
				return
			}
			if(this.player.angle === -90 && this.player.y > next_y){
				this.player.y-=0.7
				return
			}
			this.index++
		}
	}

	restart_func(last_best_score){
		if (last_best_score > this.best_score){
			this.best_score = last_best_score
			this.scoreLabel.setBestScore(last_best_score)
		}
		this.player.x = 39.75
		this.player.y =39.6+35
		this.player.angle = 0 
		this.initialization_objects()
		this.scoreLabel.setScore(0)

		this.stars.getChildren().forEach(function(star) {
			star.visible = true
			star.body.enable = true
		}, this);
		this.bombs.getChildren().forEach(function(bomb) {
			bomb.visible = true
			bomb.body.enable = true		
		}, this);

		if(this.stop_bool === false){
			this.scene.pause()
		}	
	  }


	gameOver(message){
		this.pauseBtn.setVisible(false)
		this.stopBtn.setVisible(false)
		this.runner.showModel(this.scoreLabel.getScore(),message)
	}
}