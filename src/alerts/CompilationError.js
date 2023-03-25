import { Modal } from "bootstrap";
import { useState } from "react";


function CompilationError(props) {

    return (
        <div className="alert alert-danger" role="alert">
            {props.text}
        </div>
    );

}

export default CompilationError;