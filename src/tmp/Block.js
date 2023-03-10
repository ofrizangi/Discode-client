

// // import { useEffect, useRef, useState } from 'react';
// // import { Stage } from "react-pixi-fiber";
// import { useRef , cloneElement, useState} from "react";
// import Draggable from "react-draggable";


// function Block(props) {


//     // const [dragableItem, setDragableItems] = useState

//     const block = props.block

//     const divStyle = {
//         backgroundColor: block.color,
//       };

//     const eventHandler = (e, data) => {
//         console.log('Event Type', e.type);
//         console.log({e, data});
//     }

//     const blockRef = useRef()

//     const blockElement =
//                     <div className="block" style={divStyle} onClick={copyElement}>{block._id}
//                     {console.log(block)}
//                     </div>

//     function copyElement(){
//         clonedElement = cloneElement(blockElement, { ref: blockRef });
//         console.log(clonedElement)
//     }

//     var clonedElement = null

//     function onDragHandler(event){
//         // console.log(event.target.id)
//         // console.log(event.dataTransfer)
//         event.dataTransfer.setData("block" , event.target.id)
//     }
    
//     // const clonedElement = cloneElement(blockElement, { ref: blockRef });

//     // onMouseDown={eventHandler}
//     // onDrag={eventHandler}
//     // onStop={eventHandler}

//     return (
//         <div draggable="true" onDragStart={onDragHandler} id={block._id} style={divStyle}>{block._id}
//             {console.log(block)}
//         </div>
//     );
// }

//         // {clonedElement !== null && 

//         // <Draggable
//         //     onMouseDown={eventHandler}
//         //     onStart={eventHandler}
//         //     onDrag={eventHandler}
//         //     onStop={eventHandler}>
//         //     {clonedElement}
//         // </Draggable>

//         // }

// export default Block;