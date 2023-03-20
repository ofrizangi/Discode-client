import './blockBoard.css'
import BlockRowConst from './BlockRowConst';


function BlockBoardConst(props) {

    const solution = props.solution

    function get_solution(){
        var my_solution = []
        for(let i=0;i<solution.length; i++){
            my_solution[i] = props.commands.find(command => command._id === solution[i])
        }
        return my_solution
    }


    return (
        <div className="board">
            {console.log("current solution", solution)}
                {get_solution().map((row, index) => (
                    <BlockRowConst key={index} row={row} index={index} setDroppableBlock={props.setDroppableBlock} droppableBlock = {props.droppableBlock} commands={props.commands} setCommands={props.setCommands}> </BlockRowConst>
                ))}
        </div>
      );
}

export default BlockBoardConst;