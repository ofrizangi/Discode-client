import BaseRunner from "./baseRunner";

import {post_best_score_api} from '../../gamePage/gamesAPI';

export class StarsQuestRunner extends BaseRunner{

    constructor(code,back_to_levels, next_level, gameSence,board,  blocks, leftSideView,expected_solution, solve_in_server_function,best_score){
        super(code,back_to_levels, next_level, gameSence, blocks, leftSideView,expected_solution, solve_in_server_function)
        this.board = this.replace_to_names(board)
        this.score = this.add_wall(board)
        this.best_score = best_score
    }

    replace_to_names(board){
        let numbers_rows = board.length + 2
        let numbers_cols = board[0].length + 2
        let arr = [];
        for (let i = 0; i < numbers_rows; i++) {
            arr[i] = [];
            for (let j = 0; j < numbers_cols; j++) {
                
                if (i === 0 || i === numbers_rows-1 || j===0 || j ===numbers_cols-1){
                    arr[i][j] = "wall";
                }
                else{
                    if (board[i-1][j-1] == "*"){
                        arr[i][j] =  "no entry sign"
                    }
                    else if (board[i-1][j-1] < 0){
                        arr[i][j] =  "bombs"
                    }
                    else if(board[i-1][j-1] > 0){
                        arr[i][j] =  "stars"
                    }
                    else{
                        arr[i][j] =  0
                    }
                }
            }
          }
        return arr
        }

    add_wall(board){
        let numbers_rows = board.length + 2
        let numbers_cols = board[0].length + 2
        let arr = [];
        for (let i = 0; i < numbers_rows; i++) {
            arr[i] = [];
                for (let j = 0; j < numbers_cols; j++) {
                    if (i === 0 || i === numbers_rows-1 || j===0 || j ===numbers_cols-1){
                        arr[i][j] = -1;
                    }
                    else{
                        if (board[i-1][j-1] === "*"){
                            arr[i][j] =  -100
                        }
                        else {
                            arr[i][j] =  board[i-1][j-1]
                        }
                    }
                }
            }
        return arr  
    }
 
   
    checkSolution(score, message_from_sence) {
        if (message_from_sence != undefined){
            return {
                'compare': false,
                'message': <h3 id="fails">{message_from_sence}</h3>
              }
        }
        else if (score < this.expected_solution){
            return {
                'compare': false,
                'message':  <h3 id="blue">{`Nice try, your score is ${score}.\nNow we expect it to reach ${this.expected_solution} points\n`}</h3>
              }
        }
        else if(score >= this.expected_solution && score > this.best_score){
            post_best_score_api(score)
            return {
                'compare': true,
                'message':  <h3 id="succeeded">{`Well done, your score is ${score}.\nyou broke your record, keep it up!\n`}</h3>
              }
        }
        else {
            return {
                'compare': true,
                'message': <h3 id="succeeded">{`Well done, your score is ${score}\n`}</h3> 
              }
        }

    }

    async runcode(){
        const blocks = this.blocks
		const validate_arguments = this.leftSideView === "editor" ? this.validate_arguments : function(){}
        var actionsList = []
        var x = 1
        var y = 1
        var angle = 0
        var board = this.board
        var score = this.score
        const plus = function(x) {return x+1}
        const minus = function(x) {return x-1}
        const id = function(x) {return x}

        const dict_col = {0 : {"front":plus, "left":id, "right":id} , 90 : {"front":id, "left":plus, "right":minus},
                     180:{"front":minus, "left":id, "right":id},270:{"front":id, "left":minus, "right":plus}}

        const dict_row = {0 : {"front":id, "left":minus, "right":plus} , 90 : {"front":plus, "left":id, "right":id},
                     180: {"front":id, "left":plus, "right":minus},270:{"front":minus, "left":id, "right":id}}

        const get_next_col = function(direction){
            return dict_col[angle][direction](x)
        }

        const get_next_row = function(direction){
            console.log("row" , dict_col[angle][direction](y))
            return dict_row[angle][direction](y)
        };

        const writeActions = function() {
            validate_arguments(blocks, arguments[0], [arguments[1]])
			actionsList.push({name: arguments[0] , arg : arguments[1] })
        }
        
        const drive =  function(numberSteps){
            x = get_next_col("front")
            y = get_next_row("front")
            writeActions("drive", numberSteps)
        };

        const turn = function(direction){
            if (direction === "right"){
                angle = (angle +90)%360
            }
            else{
                angle = (angle -90+360)%360
            }
            writeActions("turn" , direction)
        };

        const infinite_code = await this.if_infinite_code()

		if(infinite_code){
			alert("infinite code")
		}
        else {
            try {
                eval(this.code)
                this.actionsList = actionsList
                console.log(this.actionsList)
                this.gameSence.resume("starsQuest", {list:actionsList, runner:this})
            }
            catch(message){
                alert(this.check_errors(message))
            }
        }
    }
}