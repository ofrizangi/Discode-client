
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
  }

  render() {

    return (
      <Modal
        show={this.state.open}
        onHide={() => this.setState({
          open: false
        })}
        dialogAs={DraggableModalDialog}
      >
        <Modal.Header closeButton className="grab">
          <Modal.Title>Your solution </Modal.Title>
        </Modal.Header>
          <Modal.Body className="modalBody">{this.props.text}</Modal.Body>
          {/* <Modal.Footer>Footer</Modal.Footer> */}
      </Modal>
    );
  }
}

export default CodeModal