import BaseRunner from "./baseRunner";

export class StarsQuestRunner extends BaseRunner{

    checkSolution() {
        return {
            'compare': true,
            'message': `Nice idea, well done\n`
          }
    }

    runcode(){
        var actionsList = []
        const writeDrive = function(numberSteps) {actionsList.push({name:"drive",numberSteps:numberSteps})}
        const writeTurn = function(dirction_) {actionsList.push({name:"turn", dirction:dirction_})}
        const drive =  function(numberSteps){writeDrive(numberSteps)};
        const turn = function(dirction){writeTurn(dirction)};

  
        eval(this.code)
        this.compareSolution = this.checkSolution()
        this.runSim("starsQuest", actionsList)
        return this.compareSolution.compare; 
    }

}