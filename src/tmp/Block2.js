

// import { useEffect, useRef, useState } from 'react';
// // import { Graphics } from '@pixi/react';
// import { Application } from "pixi.js";
// import * as PIXI from 'pixi.js'; 


// function Block2(props) {

//     const [block, setBlock] = useState(props.block)

//     const ref = useRef(null);

//     const app = new Application({
//         width: 800,
//         height: 600,
//         backgroundColor: 0x5BBA6F,
//       });

//     useEffect(() => {

//         // On first render add app to DOM
//         ref.current.appendChild(app.view);
//         // Start the PixiJS app
//         app.start();
    
//         return () => {
//           // On unload stop the application
//           app.stop();
//         };
//       }, []);


//     function draw_rectangle(){
//         var graphics = new PIXI.Graphics();
//         app.stage.addChild(graphics);
//         graphics.beginFill(0xFFFF0B, 0.5);
//         graphics.drawCircle(470, 90,60);
//         graphics.endFill();
//     }

  
//     return (
//         <div ref={ref} className="block">
//             {props.block._id}
//             {draw_rectangle()}
//         </div>
//     );
// }

// export default Block2;