
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
		this.props.setRunCode(false);
	}
	
	handleSubmit(event) {
		event.preventDefault();
		this.setState({ open: false });
		var args = []
		for(let i=0 ; i<this.props.arguments_name.length; i++){
			if(isNaN(this.state[this.props.arguments_name[i]])){
				args.push(`'${this.state[this.props.arguments_name[i]].toString()}'`)
			}
			else {
				args.push(this.state[this.props.arguments_name[i]])
			}
		}
		this.props.setArgs(args)
	}
	
	render() {
		return (
		<Modal
			show={this.state.open}
			onHide={this.hideModal}
			dialogAs={DraggableModalDialog}>
			
			<Modal.Header closeButton className="grab">
				<Modal.Title> Insert code arguments </Modal.Title>
			</Modal.Header>
			<Modal.Body className="modalBody">
				<form onSubmit={this.handleSubmit}>
					{this.props.arguments_name.map((name, index) => {
						return <div key={index} className="form-group row input-text">
								<label htmlFor="name" className="col-sm-2 col-form-label">{name}:</label>
								<div className="col-sm-10">
									<input type="text" className="form-control" id="name" value={this.state.name} onChange={(event) => {this.setState({[name]: event.target.value});}} />
								</div>
						</div>

					})}
					<div className="d-flex justify-content-center">
        				<input type="submit" className="btn btn-success submit-button" value="Submit" />
					</div>
				</form>
			</Modal.Body>
		</Modal>
		);
	}
}

export default InsertArgsModal