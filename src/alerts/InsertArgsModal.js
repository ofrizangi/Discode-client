
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
		const state_dict = { open: true, error:<></>}
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
		var args = []
		for(let i=0 ; i<this.props.arguments_name.length; i++) {
			if(this.state[this.props.arguments_name[i]] === ""){
				this.setState( {error :<div className="error-modal">you didn't enter the argument {this.props.arguments_name[i]} </div>})
				return
			}
			if(isNaN(this.state[this.props.arguments_name[i]])){
				if(this.props.arguments_name[i] !== "string" && this.props.arguments_name[i] !== "sign"){
					this.setState( {error :<div className="error-modal">{this.props.arguments_name[i]} must be a number </div>})
					return
				}
				args.push(`'${this.state[this.props.arguments_name[i]].toString()}'`)
			}
			else {
				args.push(this.state[this.props.arguments_name[i]])
			}
		}
		this.setState({ open: false });
		this.props.setArgs(args)
	}
	
	render() {
		return (
		<Modal
			show={this.state.open}
			onHide={this.hideModal}
			dialogAs={DraggableModalDialog}>
			
			<Modal.Header closeButton className="grab modal-titles-container">
				<Modal.Title className="args-modal-title"> Insert code arguments </Modal.Title>
				{this.state.error}
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