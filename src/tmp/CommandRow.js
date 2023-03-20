// import './blockBoard.css'
// import { Draggable } from 'react-beautiful-dnd';


// function CommandRow(props) {

//     const row = props.row

//     function onDropHandler(event){
//         const block = event.dataTransfer.getData("block")
//         console.log(block)
//         console.log(row)
//     }

//     function onDragHandler(event){
//         event.preventDefault()
//     }


//     return (
//         <Draggable draggableId={"draggable_row" + props.index} index={props.index}>
//             {(provided, snapshot) => (
//                 <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="command_row" onDrop={onDropHandler} onDragOver={onDragHandler}>
//                     {row.row_number}
//                 </div>
//             )}
//         </Draggable>
//       );

// }
// export default CommandRow;






    // function dragStartHandler(draggable_block){
    //     if(draggable_block.source.droppableId.includes(Constants.DROPPABLE_LIST_ID)){
    //         console.log("num" ,commands.length ,props.max_number_of_rows  )
    //         if(commands.length >= props.max_number_of_rows) {
    //             alert("to many blocks")
    //             console.log("startttttttttttttttttttt", draggable_block)
    //             return false
    //         }
    //     }
    //     return true
    // }
      