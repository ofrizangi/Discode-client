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
