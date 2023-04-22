import Phaser from 'phaser'


const SKY = 'background'
const CAR = "car"

   
export default class MazeScene extends Phaser.Scene
{
    constructor()
	{
		super('maze')
		

	}

	preload()
	{
		this.load.image(SKY, 'assets/textures/maze/maze5.png')
		this.load.image(CAR, 'assets/animations/car1.png')

    }
    create()
	{  
        // origin is center
        this.add.image(225, 263, SKY)
		//this.add.image(225, 263, CAR).setScale(0.1)
		this.player = this.createPlayer()
		this.cursors = this.input.keyboard.createCursorKeys()

		//this.scene.pause();
	}
	createPlayer()
	{
        const player = this.physics.add.sprite(100, 300, CAR).setScale(0.1)
		console.log(player.angle)
		player.setAngle(player.angle-270)
		console.log(player.angle)

	    player.setCollideWorldBounds(true)
		this.newAction("right",0)
		this.newAction("turn left",1500)
		this.newAction("up",1600)
		this.newAction("turn left",3000)
		this.newAction("left",3100)
		this.newAction("turn left",4500)
		this.newAction("down",4600)
        return player
	}

	newAction(action, time){
		setTimeout(() => {
			this.player.setVelocityY(0)
			this.player.setVelocityX(0)
			if(action === "turn right"){
				this.player.setAngle(this.player.angle+90)
			}
			else if(action === "turn left" ){
				this.player.setAngle(this.player.angle-90)
			}		
			else if(action === "right" ){
				this.player.setVelocityX(160)
			}			
			else if(action === "left" ){
				this.player.setVelocityX(-160)
			}			
			else if(action === "up" ){
				this.player.setVelocityY(-160)
			}
			else if(action === "down" ){
				this.player.setVelocityY(160)
			}
		  }, time);
	}  

	update()
	{


        // check - Phaser also allows you to create more complex motions, with momentum and acceleration
		this.player.setVelocityX(0)
		this.player.setVelocityY(0)
		if (this.cursors.right.isDown && this.cursors.down.isDown)
		{
			this.player.setAngle(this.player.angle-90)
		}
		
		else if (this.cursors.right.isDown && this.cursors.up.isDown)
		{
			this.player.setAngle(this.player.angle-90)
		}
		else if (this.cursors.left.isDown && this.cursors.up.isDown)
		{
			this.player.setAngle(this.player.angle-90)
		}
		else if (this.cursors.left.isDown && this.cursors.down.isDown)
		{
			this.player.setAngle(this.player.angle-90)
			
		}
		else if (this.cursors.left.isDown)
		{
			this.player.setVelocityX(-160)
		}
		else if (this.cursors.right.isDown)
		{
			this.player.setVelocityX(160)
		}
		else if (this.cursors.up.isDown)
		{
			this.player.setVelocityY(-160)
		}
		else if (this.cursors.down.isDown)
		{
			this.player.setVelocityY(160)
		}
       
	}

}