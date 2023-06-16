import { useState } from "react";


function ErrorMessage(props) {

    const [showAlert, setShowAlert] = useState(true);
  
    const handleAlertClose = () => {
      setShowAlert(false);
      props.setError("")
    };

	const formattedText = props.text.replace(/(\*\*)(.*?)\1/g, '<b>$2</b>');


    return (
        <div>
        {showAlert && (
          <div className="alert alert-danger alert-dismissible" role="alert">
            <span className="alert-text" dangerouslySetInnerHTML={{ __html: formattedText }}/>
			<i className="bi bi-x close close-button" onClick={handleAlertClose}></i>
          </div>
        )}
      </div>
    );

}
export default ErrorMessage;