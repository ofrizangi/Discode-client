import Phaser from 'phaser'

export default class BombSpawner
{
	
	constructor(scene, bombKey = 'bomb')
	{
		this.scene = scene
		this.key = bombKey

		this._group = this.scene.physics.add.group()
	}

	get group()
	{
		return this._group
	}

	spawn(playerX = 0)
	{
        //we pick a random x coordinate for it, always on the opposite side of the screen to the player, just to give them a chance
		const x = (playerX < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400)

        const bomb = this.group.create(x, 16, this.key)
        bomb.setBounce(1)
        bomb.setCollideWorldBounds(true)
		bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)
		
		return bomb
	}
}