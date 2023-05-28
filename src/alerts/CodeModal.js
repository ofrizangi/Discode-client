
import Modal from "react-bootstrap/Modal";
import ModalDialog from "react-bootstrap/ModalDialog";
import Draggable from "react-draggable";
import React from 'react';

import './alerts.css'

class DraggableModalDialog extends React.Component {
  render() {
    return (
      <Draggable handle=".modal-header">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

class CodeModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  };

  showModal = () => {
    this.setState({ open: true });
  };
  
  hideModal = () => {
    this.setState({ open: false });
  }
    
  nextLevel = () => {
    this.hideModal()
    this.props.next_level()

  };

  backToLevels = () => {
    this.hideModal()
    this.props.back()
  };
  
  render() {

    return (
      <Modal
        show={this.state.open}
        onHide={() => this.setState({open: false})}
        dialogAs={DraggableModalDialog}
      >
        <Modal.Header closeButton className="grab">
          <Modal.Title>Your solution </Modal.Title>
          
        </Modal.Header>
          <Modal.Body className="modalBody">
          {this.props.message}
            <p>{this.props.text}</p>
            </Modal.Body>
            <Modal.Footer id='buttons-footer'>
              <button  type="button" className="btn btn-success" onClick={this.hideModal}>Retry</button>
              <button type="button" className="btn btn-success" onClick={this.backToLevels}>Levels</button>
              {this.props.compare ?  <button type="button" className="btn btn-success" onClick={this.nextLevel}>Next</button> :               
			  	<button type="button" className="btn btn-success" onClick={this.nextLevel} disabled>Next</button>}

            </Modal.Footer>
          {/* <Modal.Footer>Footer</Modal.Footer> */}
      </Modal>
    );
  }
}

export default CodeModal