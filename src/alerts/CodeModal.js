
import React from "react";
import Modal from "react-bootstrap/Modal";
import ModalDialog from "react-bootstrap/ModalDialog";
import Draggable from "react-draggable";

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

  render() {
    return (
      <Modal
        show={this.props.modalOpen}
        onHide={() => this.props.setModalOpen(false)}
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