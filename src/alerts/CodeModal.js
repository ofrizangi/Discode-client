
import Modal from "react-bootstrap/Modal";
import ModalDialog from "react-bootstrap/ModalDialog";
import Draggable from "react-draggable";
import React from 'react';
import * as Constants from '../constants';
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
	this.props.gameBoard.unmount();
  }
  
	retryLevel = () => {
		this.hideModal()
		this.props.retry_level()
		this.props.gameSence.scenes[0].restart_func(this.props.best_score)
	}

  	nextLevel = () => {
		this.hideModal()
		this.props.next_level()
	};

	backToLevels = () => {
		this.hideModal()
		this.props.back()
	};

	componentDidMount() {
		window.addEventListener('popstate', this.hideModal);
	  }
	
	componentWillUnmount() {
		window.removeEventListener('popstate', this.hideModal);
	}
  
  render() {

    return (
      <Modal
        show={this.state.open}
        onHide={() => {this.retryLevel()}}
        dialogAs={DraggableModalDialog}
		>
        <Modal.Header closeButton className="grab">
			<Modal.Title> {this.props.message} </Modal.Title>
        </Modal.Header>
        {this.props.text !== "" && 
		<Modal.Body className="modalBody">
            <pre>{this.props.text}</pre>
        </Modal.Body>}
        <Modal.Footer id='buttons-footer'>
			<button  type="button" className="btn btn-success" onClick={this.retryLevel}>Retry</button>
			<button type="button" className="btn btn-success" onClick={this.backToLevels}>Levels</button>
			{(this.props.compare && this.props.level_number < Constants.NUMBER_OF_LEVELS) ?  <button type="button" className="btn btn-success" onClick={this.nextLevel}>Next</button> :               
				<button type="button" className="btn btn-success" onClick={this.nextLevel} disabled>Next</button>}
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CodeModal