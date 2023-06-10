import BaseRunner from "./baseRunner";

import * as Constants from './../../constants';

export class DancerRunner extends BaseRunner{


    checkSolution(solution) {
      console.log(solution)
        var len_solution = solution.length;
        var len_expected_solution = this.expected_solution.length;
        if(len_solution === 0){
          return { 'compare': false, 'message': <div className="modal-title"> <h3 id="blue">There is nothing to run</h3>please drag blocks</div> }
        }
        if(len_expected_solution === 0){
          return { 'compare': true, 'message': <div className="modal-title"> <h3 id="succeeded"> Nice idea, well done </h3> </div> }
        }
        console.log(len_expected_solution, len_solution)
        if(len_solution > len_expected_solution){
          return {
            'compare': false,
            'message': <div className="modal-title"> <h3 id="fails"> Wrong solution </h3> Your solution contains {len_solution - len_expected_solution} more actions than expected </div>
          };
        }
        
        else if(len_expected_solution > len_solution){
          return {
            'compare': false,
            'message': <div className="modal-title"> <h3 id="fails"> Wrong solution </h3> Your solution contains {len_expected_solution - len_solution} less actions than expected </div>
          };
        } 
        else {
          for (var i = 0; i < len_solution; i++) {
            if (solution[i] !== this.expected_solution[i]) {    
              return {
                'compare': false,
                'message': <div className="modal-title"> <h3 id="fails"> Wrong solution </h3> action number {i+1} is not corrcet </div>
              };
            }
          }
        }
        return {
          'compare': true,
          'message': <div className="modal-title"> <h3 id="succeeded"> well done </h3> </div>
        };
    }


    async runcode(){
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

		const infinite_code = await this.if_infinite_code()

		if(infinite_code){
			return Constants.INFINITE_CODE
		}
		else {
			try {
				eval(this.code)
        // if (actionsList.length > 0){
        this.gameSence.resume("dancer", {list:actionsList, runner:this})
        // }
				return "done"
			}
			catch(message){
				return this.check_errors(message)
			}
		}
    }

    
}

