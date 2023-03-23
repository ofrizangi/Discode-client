//החסרון הוא שהזמנים קבועים
createPlayer()
{
    //..........
	this.anims.addMix('left', 'right', 5000)
	this.anims.addMix('turn', 'right', 1000)
	this.anims.addMix('right', 'left', 1000)

    return player
}	

runGame()
{
	this.player.setVelocityY(0)
	this.player.setVelocityX(-160)
	setTimeout(() => {
		this.player.setVelocityX(160)
	}, 5000);
	this.player.anims.play('right', true)
}


