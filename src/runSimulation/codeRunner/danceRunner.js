import BaseRunner from "./baseRunner";

export class DancerRunner extends BaseRunner{

	constructor(expected_solution,code,back_to_levels, next_level, gameSence, blocks, leftSideView){
		super(code,back_to_levels, next_level, gameSence, blocks, leftSideView)
		this.expected_solution = expected_solution
	}

    checkSolution() {
        var len_solution = this.actionsList.length;
        var len_expected_solution = this.expected_solution.length;
        if(len_expected_solution === 0){
          return { 'compare': true, 'message': `Nice idea, well done\n`}
        }
        if(len_solution > len_expected_solution){
          return {
            'compare': false,
            'message': `Your solution contains ${len_solution - len_expected_solution} more operations than expected\n`
          };
        }
        else if(len_expected_solution > len_solution){
          return {
            'compare': false,
            'message': `Your solution contains ${len_expected_solution - len_solution} less operations than expected\n`
          };
        } 
        else {
          for (var i = 0; i < len_solution; i++) {
            if (this.actionsList[i] !== this.expected_solution[i]) {    
              return {
                'compare': false,
                'message': `action number ${i+1} is not corrcet\n`
              };
            }
          }
        }
        return {
          'compare': true,
          'message': `Well done\n`
        };
    }


    runcode(){
      	const blocks = this.blocks
		const validate_arguments = this.leftSideView === "editor" ? this.validate_arguments : function(){}


        var actionsList = []
        function writeActions() {
			validate_arguments(blocks, arguments[0], arguments[1])
			let actionName = arguments[0];
			for (const string of arguments[1]) {
				actionName = actionName + " " + string
			}
			actionsList.push(actionName)
        }
          
        function jump(){ writeActions("jump", arguments)}
        const swing =  function(){writeActions("swing", arguments)};
        const cartwheel =  function(){writeActions("cartwheel", arguments)};
        const stomp =  function(){writeActions("stomp", arguments)};
        const wiggle =  function(){writeActions("wiggle", arguments)};
        const shrink =  function(){writeActions("shrink", arguments)};
        const slide =  function(){writeActions("slide", arguments)};
        const turn_by = function(){writeActions("turn_by", arguments)};

        try {
			eval(this.code)
			this.actionsList= actionsList
			this.compareSolution = this.checkSolution()
			this.gameSence.resume("dancer", {list:actionsList, runner:this})
			return this.compareSolution.compare;
        }
        catch(message){
			alert(this.check_errors(message))
        }
    }
}

