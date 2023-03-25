import {motion} from "framer-motion"
import './alerts.css'


function BackDrop({children, onClick}) {



    return (
        <motion.div
            className="backdrop"
            onClick={onClick}
            initial={{opacity: 0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            > {children} </motion.div>

    );

}

export default BackDrop;