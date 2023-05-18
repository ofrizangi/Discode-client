import BaseRunner from "./baseRunner";

export class StarsQuestRunner extends BaseRunner{

    constructor(code,back_to_levels, next_level, gameSence,board,  blocks, leftSideView){
        super(code,back_to_levels, next_level, gameSence, blocks, leftSideView)
        this.board = this.replace_to_names(board)
        this.score = this.add_wall(board)
        console.log(this.board)
    }

    replace_to_names(board){


        let numbers_rows = board.length + 2
        let numbers_cols = board[0].length + 2
        console.log(board)
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

          
        console.log(arr)
        return arr
        }

        add_wall(board){

            console.log(board)
            let numbers_rows = board.length + 2
            let numbers_cols = board[0].length + 2
            console.log(numbers_rows,numbers_cols)
            console.log(board)
            let arr = [];
            for (let i = 0; i < numbers_rows; i++) {
                arr[i] = [];
                for (let j = 0; j < numbers_cols; j++) {
                    if (i === 0 || i === numbers_rows-1 || j===0 || j ===numbers_cols-1){
                        arr[i][j] = "wall";
                    }
                    else{
                        if (board[i-1][j-1] == "*"){
                            arr[i][j] =  -100
                        }
                        else {
                            arr[i][j] =  board[i-1][j-1]
                        }
                    }
              }
            }
        console.log(arr)
        return arr
        
    }

    checkSolution() {
        return {
            'compare': true,
            'message': `Nice idea, well done\n`
          }
    }

    runcode(){

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

        const get_next_optional_col = function(direction){
            // console.log(angle)
            // console.log(direction)

            // console.log(dict_col[angle])
            if (score[get_next_optional_row(direction)][dict_col[angle][direction](x)] > score[get_next_optional_row(direction)][dict_col[angle][direction](x)]) {
                console.log("first");
            }
            else {
                console.log("second");

            }
            console.log(dict_col[angle][direction](x))

            return dict_col[angle][direction](x)
        }

        const get_next_optional_row = function(direction){
            console.log(dict_col[angle][direction](y))
            return dict_row[angle][direction](y)
        };
            
        // const writeDrive = function(numberSteps) {actionsList.push({name:"drive",numberSteps:numberSteps})}
       
        // const writeTurn = function(dirction_) {actionsList.push({name:"turn", dirction:dirction_})}

        const writeActions = function() {
            validate_arguments(blocks, arguments[0], arguments[1])
			actionsList.push({name: arguments[0] , arg : arguments[1] })
        }
        
        const drive =  function(numberSteps){
            x = get_next_optional_col("front")
            y = get_next_optional_row("front")
            writeActions("drive", numberSteps)
        };

        const turn = function(dirction){
            if (dirction == "right"){
                angle = (angle +90)%360
            }
            else{
                angle = (angle -90+360)%360
            }
            writeActions("turn" , dirction)
        };

        try {
			eval(this.code)
			this.actionsList = actionsList
			this.compareSolution = this.checkSolution()
			this.gameSence.resume("starsQuest", {list:actionsList, runner:this})
			return this.compareSolution.compare;
        }
        catch(message){
			alert(this.check_errors(message))
        }
    }

}


// const writeActions = function() {
//     validate_arguments(blocks, arguments[0], arguments[1])
//     actionsList.push({name: arguments[0] , arg : arguments[1] })
// }

// const drive =  function(numberSteps){writeActions("drive", numberSteps)};
// const turn = function(dirction){writeActions("turn" , dirction)};


// try {
//     eval(this.code)
//     this.actionsList = actionsList
//     this.compareSolution = this.checkSolution()
//     this.gameSence.resume("starsQuest", {list:actionsList, runner:this})
//     return this.compareSolution.compare;
// }
// catch(message){
//     alert(this.check_errors(message))
// }