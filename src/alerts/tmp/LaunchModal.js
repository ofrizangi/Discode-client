import { Modal } from "bootstrap";
import { useState } from "react";


function LaunchModal() {

    const [modalOpen, setModelOpen] = useState(false)

    const close = () => setModelOpen(false)
    const open = () => setModelOpen(true)

    return (
        <div>
            <button onClick={()=> modalOpen ? close() : open()}> Modal </button>
            {modalOpen && <Modal handleClose={close} text={"heyyyyyyyy"} modalOpen={modalOpen}/>}
        </div>
    );

}

export default LaunchModal;