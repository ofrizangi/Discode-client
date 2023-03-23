import Phaser from 'phaser'
import ScoreLabel from './ui/SorceLabel'
import BombSpawner from './BombSpawner'


const GROUND_KEY = 'ground'
const SKY_KEY = 'sky'
const STAR_KEY = 'star'
const BOMB_KEY = 'bomb'
const DUDE_KEY = 'dude'

export default class GameScene extends Phaser.Scene
{
    constructor()
	{
		super('game-scene')
        this.player = undefined
        this.cursors = undefined
		this.scoreLabel = undefined
        this.stars = undefined
        this.bombSpawner = undefined
        this.gameOver = false
	}

	// Phaser will automatically look for this function when it starts and load anything defined within it.
	preload()
	{
        // load the assets we need for our game.
		this.load.image(SKY_KEY, './sky.png')
		this.load.image(GROUND_KEY, './platform.png')
		this.load.image(STAR_KEY, './star.png')
		this.load.image(BOMB_KEY, './bomb.png')

        //Dynamic  - aprite sheet object - That is because it contains animation frames.
        // image is 288*48 - all sum image is 32*48/ atart frame, end frame
		this.load.spritesheet(DUDE_KEY, './dude.png',
			{ frameWidth: 32, frameHeight: 48 }
		)
	}

    create()
	{  
        // origin is center
        this.add.image(400, 300, SKY_KEY)

		const platforms = this.createPlatforms()
        this.player = this.createPlayer()
        this.stars = this.createStars()

        //16 x 16 is the coordinate to display the text at. 
        this.scoreLabel = this.createScoreLabel(16, 16, 0)
        this.bombSpawner = new BombSpawner(this, BOMB_KEY)
        const bombsGroup = this.bombSpawner.group

        //In order to allow the player to collide with the platforms we can create a Collider objec
        this.physics.add.collider(this.player, platforms)
        // star coolid with platforms
        this.physics.add.collider(this.stars, platforms)
        //We use it to create the collider for bombs and platforms on line 53. - לא הבנתי
        this.physics.add.collider(bombsGroup, platforms)

        this.physics.add.collider(this.player, bombsGroup, this.hitBomb, null, this)

        // This tells Phaser to check for an overlap between the player and any star in the stars Group. If found then they are passed to the 'collectStar' function:
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)


        //we will add some keyboard controls.
        this.cursors = this.input.keyboard.createCursorKeys()
	}

   

	createPlatforms()
	{
		const platforms = this.physics.add.staticGroup()
        // setScale - ground is 400*32, we need 800*64 - we need this platform to span the full width of our game.
        // refreshBody - The call to refreshBody() is required because we have scaled a static physics body, so we have to tell the physics world about the changes we made.
		platforms.create(400, 568, GROUND_KEY).setScale(2).refreshBody()

		platforms.create(600, 400, GROUND_KEY)
		platforms.create(50, 400, GROUND_KEY)
		platforms.create(750, 220, GROUND_KEY)
        return platforms
	}
	createPlayer()
	{
        // creation of a Physics Sprite and the.
        // positioned at 100 x 450 pixels from the bottom of the game.
        const player = this.physics.add.sprite(100, 300, DUDE_KEY)
        // After creating the sprite it is given a slight bounce value of 0.2.
        // This means when it lands after jumping it will bounce ever so slightly. 
		player.setBounce(0.2)
        // the player won't be able to run outside of this area - according configrition
	    player.setCollideWorldBounds(true)
        // to simulate the effects of gravity on a sprite, it's as simple as writing:
        // player.body.setGravityY(300), the higher the value, the heavier your object feels and the quicker it falls
        
        // creation of some animations that it can use.
		this.anims.create({
            //  runs at 10 frames per second
            // The 'repeat -1' value tells the animation to loop.
            // The 'left' animation uses frames 0, 1, 2 and 3 
			key: 'left',
			frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1
		})
		
		this.anims.create({
			key: 'turn',
			frames: [ { key: DUDE_KEY, frame: 4 } ],
			frameRate: 20
		})
		
		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 5, end: 8 }),
			frameRate: 10,
			repeat: -1
		})
        return player
	}
    update()
	{
        if (this.gameOver)
		{
			return
		}

        // check - Phaser also allows you to create more complex motions, with momentum and acceleration
		if (this.cursors.left.isDown)
		{
            // negative horizontal velocity and start the 'left' running animation
			this.player.setVelocityX(-160)

			this.player.anims.play('left', true)
		}
		else if (this.cursors.right.isDown)
		{
			this.player.setVelocityX(160)

			this.player.anims.play('right', true)
		}
		else
		{
			this.player.setVelocityX(0)

			this.player.anims.play('turn')
		}
        // if up is down and if the player is touching the floor
		if (this.cursors.up.isDown && this.player.body.touching.down)
		{
			this.player.setVelocityY(-330)
		}
	}
    createStars()
	{
        // As we need the stars to move and bounce we create a dynamic physics group instead of a static one.
		const stars = this.physics.add.group({
            //it sets the texture key to be the star image
			key: STAR_KEY,
            //  Then it sets the repeat value to be 11. Because it creates 1 child automatically, repeating 11 times means we'll get 12 in total
			repeat: 11,
			setXY: { x: 12, y: 0, stepX: 70 }
		})
		
        //The next piece of code iterates all children in the Group and
        // gives them a random Y bounce value between 0.4 and 0.8. The bounce range is between 0,
        // no bounce at all, and 1, a full bounce. Because the stars are all spawned at y 0 gravity is
        // going to pull them down until they collide with the platforms or ground.
        // The bounce value means they'll randomly bounce back up again until finally settling to rest.

        // הכוכבים נופלים מהשמיים בקפיצה מסוימת
		stars.children.iterate((child) => {
			child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
		})

		return stars
	}

    // 
    collectStar(player, star)
	{
        // The two parameters passed to disableBody() tells Phaser to disable and hide the GameObject.
		star.disableBody(true, true)
        this.scoreLabel.add(10)

        // reset the stars after all are collected in collectStar
        // countActive to see how many stars are left alive.
		if (this.stars.countActive(true) === 0)
		{
			//  A new batch of stars to collect - כאשר אין כוכבים תיצור סט חדש
			this.stars.children.iterate((child) => {
                //eset their y position to zero. This will make all of the stars drop from the top of the screen again.
				child.enableBody(true, child.x, 0, true, true)
			})
		}

        // we spawn a bomb each time a star is collected
		this.bombSpawner.spawn(player.x)

	}
    
    createScoreLabel(x, y, score)
	{
		const style = { fontSize: '32px', fill: '#000' }
		const label = new ScoreLabel(this, x, y, score, style)

		this.add.existing(label)

		return label
	}
    hitBomb(player, bomb)
	{
        //The hitBomb(player, bomb) method simply disables physics, tints the player red, and then sets this.gameOver to true.
		this.physics.pause()

		player.setTint(0xff0000)

		player.anims.play('turn')

		this.gameOver = true
	}

    
}