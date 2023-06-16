import BaseRunner from "./baseRunner";

import * as Constants from './../../constants';

export class DancerRunner extends BaseRunner{


    checkSolution(solution) {
        var len_solution = solution.length;
        var len_expected_solution = this.expected_solution.length;
        if(len_solution === 0){
          return { 'compare': false, 'message': <div className="modal-title"> <h3 id="blue">There is nothing to run</h3>please drag blocks</div> }
        }
        if(len_expected_solution === 0){
          return { 'compare': true, 'message': <div className="modal-title"> <h3 id="succeeded"> Nice idea, well done </h3> </div> }
        }
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
		const validate_arguments = this.leftSideView === Constants.EDITOR_VIEW ? this.validate_arguments : function(){}

		var actionsList = []
        function writeActions() {
			validate_arguments(blocks, arguments[0], arguments[1])
			let actionName = arguments[0];
			for (const string of arguments[1]) {
				actionName = actionName + " " + string
			}
			actionsList.push(actionName)
        }
          
        function jump(){ writeActions(jump.name, arguments)}
        const swing =  function(){writeActions(swing.name, arguments)};
        const cartwheel =  function(){writeActions(cartwheel.name, arguments)};
        const stomp =  function(){writeActions(stomp.name, arguments)};
        const wiggle =  function(){writeActions(wiggle.name, arguments)};
        const shrink =  function(){writeActions(shrink.name, arguments)};
        const slide =  function(){writeActions(slide.name, arguments)};
        const turn_by = function(){writeActions(turn_by.name, arguments)};

		const infinite_code = await this.if_infinite_code()

		if(infinite_code){
			return Constants.INFINITE_CODE
		}
		else {
			try {
				eval(this.code)
        		this.gameSence.resume(Constants.DNACER_GAME, {list:actionsList, runner:this})
				return Constants.DONE_RUNNING
			}
			catch(message){
				return this.check_errors(message)
			}
		}
    }

   
}

