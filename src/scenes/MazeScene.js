import Phaser from 'phaser'


const SKY = 'background'


   
export default class MazeScene extends Phaser.Scene
{
    constructor()
	{
		super('maze')
		

	}

	preload()
	{
		this.load.image(SKY, 'assets/textures/sky.png')
    }
    create()
	{  
        // origin is center
        this.add.image(300, 250, SKY).setScale(1.7,1.4)
		this.scene.pause();
	}
	

}