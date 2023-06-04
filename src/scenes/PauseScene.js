import Phaser from 'phaser'
import { version } from 'react'

const RESUME = "resume"
   
export default class PauseScene extends Phaser.Scene
{
    constructor()
	{
		super('pause')
		// console.log(" constructor -PauseScene")
		this.gameIsPaused = false
		
	}

	// Phaser will automatically look for this function when it starts and load anything defined within it.
	preload()
	{
		// console.log(" preload - PauseScene")
		this.load.image(RESUME, 'assets/textures/resume.png')
	}
	init(data){
		console.log(data)
		this.name_of_sence = data.name
		this.action_list = data.action_list
		this.x = data.x
		this.y = data.y
	}

    create()
	{  
		// console.log(" create - PauseScene")
		
		this.resumeBtn = this.add.sprite(this.x, this.y, RESUME).setInteractive().setScale(0.065).setOrigin(0)
		

		this.resumeBtn.depth = 2

		this.resumeBtn.on('pointerdown', function () {
            // console.log('resumeBtn clicked');
			// console.log(this.name_of_sence)
            this.scene.resume(this.name_of_sence, {"list": this.action_list})
            this.scene.stop()
                    
		  }, this);


	}

}