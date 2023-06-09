import Phaser from 'phaser'
import ScoreLabel from './ui/SorceLabel'

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
		// this.physics.world.on('worldbounds', this.collide_wall, this);
        this.physics.add.collider(this.player, this.no_entrys, this.collide_no_entrys, null, this)
        this.physics.add.overlap(this.player, this.stars, this.collectScore, null, this)
		this.physics.add.overlap(this.player, this.bombs, this.collectScore, null, this)

		this.scene.pause();
	
		this.pauseBtn.on('pointerdown', function () {
			//console.log('button_pause clicked');
			this.scene.sendToBack('starsQuest')
			this.scene.pause('starsQuest')
			this.scene.launch('pause', {'name':'starsQuest', x:400, y:0})
		},this);

		this.stopBtn.on('pointerdown', function () {
			this.stop_bool = true
			//console.log('button_stop clicked')
			this.stopBtnClicked = true
			this.scene.pause('starsQuest')
		},this);


		this.events.on('pause', function (data) {
			//console.log("pause")
			this.is_run = false
			this.pauseBtn.setVisible(false)
			this.stopBtn.setVisible(false)
			if(this.stop_bool){
				this.gameOver("to_check")
			}
	        }, this)

		this.events.on('resume', (scene, data) => {
			
			if (data.runner != undefined){
				this.runner = data.runner
				this.action_list = data.list
			}
			this.is_run = true
			//console.log("resume", this.action_list)
			this.pauseBtn.setVisible(true)
			this.stopBtn.setVisible(true)			
		},this);

		
	}

	createPlayer()
	{
		const player = this.physics.add.sprite(39.75, 39.6+35, CAR).setScale(0.03)
		player.setDepth(2)

		return player
	}

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
	
	check_collide_wall()
	{
		// //console.log(this.player.x,this.player.y )
		 // player.setCollideWorldBounds(true)
		// player.setSize(player.width,player.width)
		// this.physics.world.setBounds(0, 35, 477, 475.3)
		// player.body.onWorldBounds = true;
		// 39.75, 39.6+35
		//width =265*0.3 =79.5 - >477-79.5/2
		// height=264*0.3=79.2 -> 475.2+35-79.2/2
		if (this.player.x < 38 || this.player.x >438.5   || this.player.y < 73.5 || this.player.y > 471.5 ){

			this.is_run = false
			//console.log(this.action_list[this.index].arg)
			this.physics.pause()
			this.gameOver("you collided with a wall\n",)		
		}
		
	}

	collide_no_entrys()
	{
		this.is_run = false
		this.physics.pause()
		this.gameOver("you can't enter there\n")
		
	}

	collectScore(player, object)
	{
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


	update(){
		//right
		if (this.is_run){
			//'x': 39.75 + (x-1)*79.5 ,"y":35+39.6+(y-1)*79.2
			// //console.log(this.player.angle)
			
			if (this.index>this.action_list.length-1){
				this.scene.pause()
				this.is_run=false
				this.gameOver(undefined)
				return
			}
			if(this.index < this.action_list.length && this.action_list[this.index].name == "turn" ){
				this.player.angle += this.angles.get(this.action_list[this.index].arg)
				this.index++
				return
			}
			var next_x = 39.7 + this.action_list[this.index].arg.x*79.5
			var next_y = 35+39.6+ this.action_list[this.index].arg.y*79.2

			//drive
			this.check_collide_wall()
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
		
		////console.log("restart_func")
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


	gameOver(message)
	{
		this.runner.showModel(this.scoreLabel.getScore(),message)
	}
}