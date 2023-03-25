import {motion} from "framer-motion"
import './alerts.css'
import BackDrop from './Backdrop'

const Modal = ({handleClose, text}) => {


    const dropIn = {
        hidden: {
          y: "-100vh",
          opacity: 0,
        },
        visible: {
          y: "0",
          opacity: 1,
          transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500,
          },
        },
        exit: {
          y: "100vh",
          opacity: 0,
        },
      };


    return (
        <BackDrop onClick={handleClose}>
            <motion.div
                drag
                onClick={(e)=>e.stopPropagation}
                className="model"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={dropIn}
            >
                <p> {text} </p>
                <button onClick={handleClose}>Close </button>
            </motion.div>



        </BackDrop>


    );

}

export default Modal;