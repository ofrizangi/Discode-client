import BaseRunner from "./baseRunner";

import {post_best_score_api} from '../../gamePage/gamesAPI';

import * as Constants from './../../constants';

export class StarsQuestRunner extends BaseRunner{

    constructor(code,back_to_levels, next_level, retry_level, gameSence,board,  blocks, leftSideView,expected_solution, solve_in_server_function, best_score){
        super(code,back_to_levels, next_level,retry_level, gameSence, blocks, leftSideView,expected_solution, solve_in_server_function)
        this.board = this.replace_to_names(board)
        this.game_board = board
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
                        arr[i][j] =  "bomb"
                    }
                    else if(board[i-1][j-1] > 0){
                        arr[i][j] =  "star"
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
                        arr[i][j] = -200;
                    }
                    else{
                        if (board[i-1][j-1] === "*"){
                            arr[i][j] = -100
                        }
                        else {
                            arr[i][j] =  board[i-1][j-1]
                        }
                    }
                }
            }
        return arr  
    }
 
    

    calculateScore(){

    var x = 0
    var y = 0
    var angle = 0
    var score = 0


    for(var i = 0; i < this.actionsList.length; i++){
		if(this.actionsList[i].name == "turn" ){
            if  (this.actionsList[i].arg == "right"){angle = (angle +90)%360; }
            else{angle = (angle -90+360)%360}
            continue
        }
        
        var next_x = this.actionsList[i].arg.x
		var next_y = this.actionsList[i].arg.y

        if (next_x < 0 || next_x > 5  || next_y < 0 || next_y > 5 ){ return {"score": 0, "message":"Game Over - you collided with a wall\n"}}
        if ( this.game_board[y][x] === '*') {return {"score": 0, "message":"Game Over - you can't enter there\n"}}

		//drive
        while (x != next_x || y != next_y){
            
            if(angle === 0 && x < next_x){x+=1;}
            else if(angle === 90 && y < next_y){y+=1; }
            else if (angle === 180 && x > next_x){x-=1;}
            else if(angle === 270 && y > next_y){y-=1}

            var val =  this.game_board[y][x]
            score += val
            this.game_board[y][x] = 0
        }
        
    }
    return {"score": score, "message":undefined}

}
			

   
    checkSolution(score, message_from_sence) {
        if (message_from_sence ===  "to_check") {
            var result = this.calculateScore()
            score = result.score
            message_from_sence=result.message
        }
        if (message_from_sence !== undefined){
            return {
                'compare': false,
                'message': <h3 id="fails">{message_from_sence}</h3>
              }
        }
        if(score > this.best_score){
            post_best_score_api(score)
        }
        if (score < this.expected_solution){
            return {
                'compare': false,
                'message':  <h3 id="blue">{`Nice try, your score is ${score}.\nNow we expect you to reach ${this.expected_solution} points\n`}</h3>
              }
        }
        if(score >= this.expected_solution && score > this.best_score){
            return {
                'compare': true,
                'message':  <h3 id="succeeded">{`Well done, your score is ${score}.\nyou broke your record, keep it up!\n`}</h3>
              }
        }
        return {
                'compare': true,
                'message': <h3 id="succeeded">{`Well done, your score is ${score}\n`}</h3> 
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

        const plus = function(x, number_steps) {return x+number_steps}
        const minus = function(x, number_steps) {return x-number_steps}
        const id = function(x) {return x}

        const dict_col = {0 : {"front":plus, "left":id, "right":id} , 90 : {"front":id, "left":plus, "right":minus},
                     180:{"front":minus, "left":id, "right":id},270:{"front":id, "left":minus, "right":plus}}

        const dict_row = {0 : {"front":id, "left":minus, "right":plus} , 90 : {"front":plus, "left":id, "right":id},
                     180: {"front":id, "left":plus, "right":minus},270:{"front":minus, "left":id, "right":id}}

        const get_next_col = function(direction,number_steps){
            return dict_col[angle][direction](x,number_steps)
        }

        const get_next_row = function(direction, number_steps){
            return dict_row[angle][direction](y,number_steps)
        };


        const writeActions = function() {
            validate_arguments(blocks, arguments[0], [arguments[1].number_steps])
			actionsList.push({name: arguments[0] , arg : arguments[1] })
        }


        const drive =  function(number_steps){
                x = get_next_col("front",number_steps)
                y = get_next_row("front",number_steps)

                validate_arguments(blocks, "drive", [number_steps])
                actionsList.push({name: "drive" , arg : {'x': x-1 ,"y":y-1} })

                writeActions("drive", {'x': x-1 ,"y":y-1, "number_steps":number_steps})
                if (x>=7 || x<=0 || y<=0 || y>=7 || board[y][x] === "no entry sign"){
                    throw new Error(`game failed`)
                }
                board[y][x] = 0
                score[y][x] = 0            
        };

        const turn = function(direction){
            if (direction === "right"){
                angle = (angle +90)%360
            }
            else{
                angle = (angle -90+360)%360
            }
            validate_arguments(blocks, "turn", [direction])
			actionsList.push({name: "turn" , arg : direction })

        };

        const infinite_code = await this.if_infinite_code()

		if(infinite_code){
			return Constants.INFINITE_CODE
		}
        else {
            try {
                eval(this.code)
                this.actionsList = actionsList
                this.gameSence.resume("starsQuest", {list:actionsList, runner:this})
                return "done"
            }
            catch(error){
                console.log(error.message)
                if (error.message === "game failed"){
                    this.actionsList = actionsList
                    console.log(this.actionsList)
                    this.gameSence.resume("starsQuest", {list:actionsList, runner:this})
                    return "done"
                }
                else {
                    return this.check_errors(error)
                }
            }
        }
    }
}