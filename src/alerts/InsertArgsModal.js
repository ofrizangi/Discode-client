
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

	class InsertArgsModal extends React.Component {

	constructor(props) {
		super(props);
		const state_dict = { open: true}
		for(let i=0 ; i<props.arguments_name.length; i++){
			state_dict[props.arguments_name[i]] = ""
		}
		this.state = state_dict
		this.showModal = this.showModal.bind(this);
		this.hideModal = this.hideModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	};

	showModal = () => {
		this.setState({ open: true });
	};
	
	hideModal = () => {
		this.setState({ open: false });
	}
	
	handleSubmit(event) {
		event.preventDefault();
		this.setState({ open: false });
		var args = []
		for(let i=0 ; i<this.props.arguments_name.length; i++){
			args.push(this.state[this.props.arguments_name[i]])
		}
		this.props.setArgs(args)
	}
	
	render() {
		return (
		<Modal
			show={this.state.open}
			onHide={() => this.setState({open: false})}
			dialogAs={DraggableModalDialog}>
			<Modal.Header closeButton className="grab">
				<Modal.Title> Insert code arguments: </Modal.Title>
			</Modal.Header>
			<Modal.Body className="modalBody">
				<form onSubmit={this.handleSubmit}>
					{this.props.arguments_name.map((name, index) => {
						return <div key={index}>
							<label> {name}:  
          						<input type="text" value={this.state.name} onChange={(event) => {this.setState({[name]: event.target.value});}} />
        					</label>
						</div>
					})}
        			<input type="submit" className="btn btn-success" value="Submit" />
				</form>
			</Modal.Body>
		</Modal>
		);
	}
}

export default InsertArgsModal