import * as Constants from './../../constants';

export class CodeRunner {

	constructor(code, expected_solution, arguments_val) {
        this.code = code
		this.expected_code = expected_solution
        this.arguments = arguments_val
        this.output = []
        this.error = ""
        this.function_call = this.create_function_call()
	}

    
    async run_code() {
        var solution = await this.code_runner(this.code)
        this.output= this.add_space_to_console_arr(solution[0])
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



    runWorker(workerUrl) {
        return new Promise(function(resolve, reject) {
          var worker = new Worker(workerUrl);
            worker.onmessage = function(event) {
                // Worker has finished its execution
                resolve(event.data);
                worker.terminate();
                clearTimeout(timeout);
            };
            worker.onerror = function(error) {
                // Worker encountered an error
                reject(error.message);
                worker.terminate();
                clearTimeout(timeout);
            };
            var timeout = setTimeout(function(){
                reject(Constants.INFINITE_CODE);
                worker.terminate();
                worker = null;
            }, 300);
        });
    }


    async code_runner(code) {
        var output = []
        var error = ""
        var bb = new Blob([this.function_call + code + "postMessage('done')"], {
            type: 'text/javascript'
        });
        var bbURL = URL.createObjectURL(bb);

        try {
            await this.runWorker(bbURL)

            const str_code = this.function_call + code

            console.stdlog = console.log.bind(console);

            console.log = function(){
                output = output.concat(Array.from(arguments))
            }

            eval(str_code)

            console.log = console.stdlog
        }
        catch(e){
            error = e
        }
        return [output, error]
    }

    async compare_solution(){
        if(this.expected_code === undefined){
            return undefined
        }
        const solution = await this.code_runner(this.expected_code)
        const expected_solution = this.add_space_to_console_arr(solution[0])
        if (JSON.stringify(expected_solution) === JSON.stringify(this.output)){
            return true
        }
        return false
    }

    add_space_to_console_arr(array) {
        for (let i = 1; i < array.length; i += 2) {
            array.splice(i, 0, ' ');
        }
        return array
    }

}