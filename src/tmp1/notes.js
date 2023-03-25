 // image is 800*600 pixels.
 // 400 - x_center, y-center
this.add.image(400, 300, 'sky')

// reset the drawing position of the image to the top-left.
this.add.image(0, 0, 'sky').setOrigin(0, 0)

		// this.horizontal_actions = new Map([
		// 	['left', -160],
		// 	["right", 160],
		// 	["turn", 0]
		//   ]);
		//   this.vertical_actions = new Map([
		// 	["up", -330],
		//   ]);

        if(dirction === "horizontal"){
            this.player.setVelocityX(velocity)
        } else{
            this.player.setVelocityY(velocity)
        }
		for (var action  of actions) {
            console.log(action);
           console.log(action.action)
           console.log(action.Duration)
           console.log(action.dirction)
           console.log(action.velocity)
       }
       console.log( actions.length)


       
		//this.player.anims.play("jumpWithHand", true)
		//this.player.anims.play("jumpWithoutHand", true)
		//this.player.anims.play("SwingHandsLeft", true)
		//this.player.anims.play("Swing Hands Right", true)
		//this.player.anims.play("turnLeftBy45", true)
		//this.player.anims.play("turnRightBy45", true)
		 //this.player.anims.play("turnLeftBy180", true)
		 //this.player.anims.play("turnRightBy180", true)
		 //this.player.anims.play("turnRightBy360", true)
		//this.player.anims.play("turnLeftBy360", true)
		 //this.player.anims.play("oneHandedCartwheel", true)
		 //this.player.anims.play("StompToLeft", true)
		 //this.player.anims.play("StompToRight", true)
		 //this.player.anims.play("wiggleLeft", true)
		//this.player.anims.play("wiggleRight", true)
		 //this.player.anims.play("shrink", true)
		//this.player.anims.play("slideToLeft", true)
		// this.player.anims.play("slideToRight", true)
