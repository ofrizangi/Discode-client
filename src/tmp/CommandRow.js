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