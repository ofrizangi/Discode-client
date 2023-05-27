import { Modal } from "bootstrap";
import { useState } from "react";


function ErrorMessage(props) {

    const [showAlert, setShowAlert] = useState(true);
  
    const handleAlertClose = () => {
      setShowAlert(false);
      props.setError("")
    };

    return (
        <div>
        {showAlert && (
          <div className="alert alert-danger alert-dismissible" role="alert">
            {props.text}
            <button type="button" className="close close-button" onClick={handleAlertClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
      </div>
    );

}

export default ErrorMessage;