import BaseRunner from "./baseRunner";

import {post_best_score_api} from '../../gamePage/gamesAPI';

import * as Constants from './../../constants';

import * as GameConstants from './../../scenes/StarsQuestScene';

export class StarsQuestRunner extends BaseRunner{

    constructor(code, level_number,back_to_levels, next_level, retry_level, gameSence,board,  blocks, leftSideView,expected_solution, solve_in_server_function, best_score){
        super(code,level_number,back_to_levels, next_level,retry_level, gameSence, blocks, leftSideView,expected_solution, solve_in_server_function)
        this.board = this.replace_to_names(board)
        this.game_board = board
        this.score = this.add_wall(board)
        this.best_score = best_score
        this.actionsList = []
    }

    replace_to_names(board){
        let numbers_rows = board.length + 2
        let numbers_cols = board[0].length + 2
        let arr = [];
        for (let i = 0; i < numbers_rows; i++) {
            arr[i] = [];
            for (let j = 0; j < numbers_cols; j++) {
                if (i === 0 || i === numbers_rows-1 || j===0 || j ===numbers_cols-1){
                    arr[i][j] = GameConstants.WALL
                }
                else{
                    if (board[i-1][j-1] === GameConstants.NO_ENTRY_SIGN){
                        arr[i][j] = GameConstants.NO_ENTRY
                    }
                    else if (board[i-1][j-1] < 0){
                        arr[i][j] =  GameConstants.BOMB
                    }
                    else if(board[i-1][j-1] > 0){
                        arr[i][j] = GameConstants.STAR
                    }
                    else{
                        arr[i][j] =  0
                    }
                }
            }
        }
        return arr
    }

    add_wall(board) {
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
                    if (board[i-1][j-1] === GameConstants.NO_ENTRY_SIGN){
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
            if(this.actionsList[i].name === "turn" ){
                if  (this.actionsList[i].arg === GameConstants.GO_RIGHT){angle = (angle +90)%360; }
                else{angle = (angle -90+360)%360}
                continue
            }
            
            var next_x = this.actionsList[i].arg.x
            var next_y = this.actionsList[i].arg.y

            for(let i=y; i<= Math.min(next_y, GameConstants.BOARD_SIZE-1); i++){
                for(let j=x; j<= Math.min(next_x, GameConstants.BOARD_SIZE-1) ; j++){
                    if(this.game_board[i][j] === GameConstants.NO_ENTRY_SIGN) {
                        return {"score": 0, "message":`Game Over - ${GameConstants.NO_ENTRY_MESSAGE}`}
                    }
                }
            }
            if (next_x < 0 || next_x >= GameConstants.BOARD_SIZE  || next_y < 0 || next_y >= GameConstants.BOARD_SIZE ){
                return {"score": 0, "message":`Game Over - ${GameConstants.WALL_MESSAGE}`}
            }
            //drive
            while (x !== next_x || y !== next_y){
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
        if(this.actionsList.length === 0){
            return { 
                'compare': false,
                'message': <div className="modal-title"> <h3 id="blue">There is nothing to run</h3> {this.leftSideView === Constants.BLOCKS_VIEW && <div> please drag blocks </div> }</div>,
                'best_score':this.best_score
            }
        }
        if (message_from_sence ===  Constants.SCENE_MESSAGE) {
            var result = this.calculateScore()
            score = result.score
            message_from_sence=result.message
        }
        if (message_from_sence !== undefined){
            return {
                'compare': false,
                'message': <div className="modal-title"> <h3 id="fails"> game over </h3> {message_from_sence}</div>,
                'best_score':this.best_score
              }
        }
        const best_score = this.best_score
        if(score > this.best_score){
            this.best_score = score
            post_best_score_api(score)
        }
        if (this.expected_solution === undefined){
            return {
                'compare': true,
                'message':  <div className="modal-title"> <h3 id="blue">Nice try</h3> your score is {score} </div>,
                'best_score':this.best_score
            }
        }
        if (score < this.expected_solution){
            return {
                'compare': false,
                'message': <div className="modal-title"> <h3 id="blue"> Nice try </h3> your score is {score}, Now we expect you to reach {this.expected_solution} points </div>,
                'best_score':this.best_score
            }
        }
        if(score >= this.expected_solution && score > best_score){
            return {
                'compare': true,
                'message':  <div className="modal-title"> <h3 id="succeeded"> Well done</h3> your score is {score}. you broke your record, keep it up! </div>,
                'best_score':this.best_score
            }
        }
        return {
            'compare': true,
            'message':  <div className="modal-title"> <h3 id="succeeded"> Well done</h3> your score is {score} </div>,
            'best_score':this.best_score
        }
    }

    async runcode(){
        const blocks = this.blocks
		const validate_arguments = this.leftSideView === Constants.EDITOR_VIEW ? this.validate_arguments : function(){}
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

        const get_next_col_n_steps = function(direction,number_steps){
            return dict_col[angle][direction](x,number_steps)
        }

        const get_next_row_n_steps = function(direction, number_steps){
            return dict_row[angle][direction](y,number_steps)
        }

        const get_next_col = function(direction){
            if(direction !== GameConstants.GO_LEFT && direction !== GameConstants.GO_FRONT && direction !== GameConstants.GO_RIGHT){
                throw new Error(`argument "${direction}" is not valid`)
            }
            return get_next_col_n_steps(direction,1)
        }

        const get_next_row = function(direction) {
            if(direction !== GameConstants.GO_LEFT && direction !== GameConstants.GO_FRONT && direction !== GameConstants.GO_RIGHT){
                throw new Error(`argument "${direction}" is not valid`)
            }
            return get_next_row_n_steps(direction,1)
        }

        const drive =  function(number_steps) {
            let prev_x = x
            let prev_y = y

            x = get_next_col_n_steps(GameConstants.GO_FRONT,number_steps)
            y = get_next_row_n_steps(GameConstants.GO_FRONT,number_steps)

            validate_arguments(blocks, drive.name , [number_steps])
            actionsList.push({name: drive.name , arg : {'x': x-1 ,"y":y-1} })

            if (x>=GameConstants.BOARD_SIZE + 1 || x<=0 || y<=0 || y>=GameConstants.BOARD_SIZE + 1 || board[y][x] === GameConstants.NO_ENTRY){
                throw new Error(Constants.GAME_FAILED)
            }
            for(let i=prev_y; i<=y; i++){
                for(let j= prev_x; j<=x ; j++){
                    board[i][j] = 0
                    score[i][j] = 0            
                }
            }
        }

        const turn = function(direction){
            if (direction === GameConstants.GO_RIGHT){
                angle = (angle +90)%360
            }
            else{
                angle = (angle -90+360)%360
            }
            validate_arguments(blocks, turn.name, [direction])
			actionsList.push({name: turn.name , arg : direction })
        }

        const infinite_code = await this.if_infinite_code()

		if(infinite_code){
			return Constants.INFINITE_CODE
		}
        else {
            try {
                eval(this.code)
                this.actionsList = actionsList
                this.gameSence.resume(Constants.STARS_QUEST_GAME, {list:actionsList, runner:this})
                return Constants.DONE_RUNNING
            }
            catch(error){
                if (error.message === Constants.GAME_FAILED){
                    this.actionsList = actionsList
                    this.gameSence.resume(Constants.STARS_QUEST_GAME, {list:actionsList, runner:this})
                    return Constants.DONE_RUNNING
                }
                else {
                    return this.check_errors(error)
                }
            }
        }
    }
}