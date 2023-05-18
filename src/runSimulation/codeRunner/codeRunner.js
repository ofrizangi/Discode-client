export class CodeRunner {

	constructor(code, expected_solution, arguments_val) {
        this.code = code
		this.expected_code = expected_solution
        this.arguments = arguments_val
        this.output = []
        this.error = ""
	}

    
    run_code() {
        var solution = this.code_runner(this.code)
        this.output= solution[0]
        this.error = solution[1]
        if(this.error !== ""){
            return false
        }
        return this.compare_solution()
    }


    create_function_call(){
        var function_call = "main("

        for (let i=0 ; i< this.arguments.length - 1 ; i++) {
            function_call = function_call + this.arguments[i] + ","
        }
        if(this.arguments.length !== 0){
            function_call = function_call + this.arguments[this.arguments.length-1]
        }
        return function_call+");"
    }


    code_runner(code) {

        var output = []
        var error = ""
        const str_code = this.create_function_call() + code

        console.log(str_code)

        console.stdlog = console.log.bind(console);

        console.log = function(){
            output = output.concat(Array.from(arguments))
        }

        try{
            eval(str_code)
        }
        catch(e) {
            error = e.message
        }

        console.log = console.stdlog
        return [output, error]
    }


    compare_solution(){
        if(this.expected_code === undefined){
            return true
        }
        const expected_solution = this.code_runner(this.expected_code)[0]
        if(JSON.stringify(expected_solution) === JSON.stringify(this.output)){
            return true
        }
        return false
    }

}


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