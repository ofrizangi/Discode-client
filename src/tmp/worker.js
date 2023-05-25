


var bb = new Blob(["console.log('hello')"], {
    type: 'text/javascript'
  });

  // convert the blob into a pseudo URL
  var bbURL = URL.createObjectURL(bb);

  // Prepare the worker to run the code
  var worker = new Worker(bbURL);


  // add a listener for messages from the Worker
  worker.addEventListener('message', function(e){
    var string = (e.data).toString();
    console.log(string)
  }.bind(this));



              // setOutput([])
        // setError("")
        // console.stdlog = console.log.bind(console);

        // console.log = function(){
        //     setOutput((prev) => {
        //         return prev.concat(Array.from(arguments))
        //     })
        //     console.stdlog.apply(console, arguments);
        // }
        // try{
        //     eval(editor_code)
        // }
        // catch(e) {
        //     setError(e.message)
        // }

        // console.log = console.stdlog
        
        // var bb = new Blob(["console.log('hello')"], {
        //     type: 'text/javascript'
        //   });
        
        //   // convert the blob into a pseudo URL
        //   var bbURL = URL.createObjectURL(bb);
        
        //   // Prepare the worker to run the code
        //   var worker = new Worker(bbURL);
        
        
        // //   add a listener for messages from the Worker
        //   worker.addEventListener('message', function(e){
        //     var string = (e.data).toString();
        //     alert(string)
        //   }.bind(this));






    //save me!!!!!!!!!
            // var bb = new Blob(["console.log('hello')"], {
        //     type: 'text/javascript'
        //   });
        
        //   // convert the blob into a pseudo URL
        //   var bbURL = URL.createObjectURL(bb);
        
        //   // Prepare the worker to run the code
        //   var worker = new Worker(bbURL);
        
        
        // //   add a listener for messages from the Worker
        //   worker.addEventListener('message', function(e){
        //     var string = (e.data).toString();
        //     alert(string)
        //   }.bind(this));



        			// console.log("my obj" , this.prototype.toString())
			

			// var bb = new Blob(["let { obj } = workerData;", "obg.hello()"], {
			// 	type: 'text/javascript'
			//   });
			
			//   // convert the blob into a pseudo URL
			//   var bbURL = URL.createObjectURL(bb);
			
			//   // Prepare the worker to run the code
			//   var worker = new Worker(bbURL,  { workerData: { obj: this } });

			//   worker.addEventListener('error', function(e){
			// 	var string = (e.message).toString();
			// 	alert(string)
			//   });

			//   worker.addEventListener('message', function(e){
			// 	var string = (e.message).toString();
			// 	console.log("nahhhhhhhhh" , string)
			//   });


			//   setTimeout(function(){
			// 	console.log("hereeeeeeee")
			// 	worker.terminate();
			// 	worker = null;
			//   }, 5000);




            
        // this.runWorker(bbURL)
        //     .then(function(result) {
        //         var output = []
        //         var error = ""
        //         const str_code = this.function_call + code

        //         console.stdlog = console.log.bind(console);

        //         console.log = function(){
        //             output = output.concat(Array.from(arguments))
        //         }

        //         try{
        //             eval(str_code)
        //         }
        //         catch(e) {
        //             error = e.message
        //         }

        //         console.log = console.stdlog
        //         return [output, error]
        //     })
        //     .catch(function(error) {
        //         alert(error)
        //     });
            
        // convert the blob into a pseudo URL
        // var bbURL = URL.createObjectURL(bb);
        
        // // Prepare the worker to run the code
        // var worker = new Worker(bbURL);

        // worker.onmessage = function(event) {
        //     console.log(event.data)
        // };

        // var timeout = setTimeout(function(){
		// 	worker.terminate();
		// 	worker = null;
        //     console.log("hereeeeeeee")
		// }, 100);

        // // Handle the 'message' event from the worker
        // worker.onmessage = function(event) {
        //     // Clear the timeout if a message is received from the worker before the timeout
        //     clearTimeout(timeout);
            
        //     // Process the message from the worker
        //     console.log('Message received from worker:', event.data);
        // };

        // // Handle the 'error' event from the worker
        // worker.onerror = function(error) {
        //     // Clear the timeout if an error occurs before the timeout
        //     clearTimeout(timeout);
            
        //     // Handle the error
        //     console.error('An error occurred in the worker:', error);
        // };

