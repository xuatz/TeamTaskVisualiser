import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Container, Item } from "./common/FlexContainer";
import { createTask } from "../actions/taskActions";

// const mapStateToProps = state => {
// 	return {
// 		isCheckingSession: state.session.isCheckingSession,
// 		isLoggedIn: state.session.isLoggedIn
// 	};
// };

const mapDispatchToProps = dispatch => ({
	//xz: sample for different pattern to bindActionCreators
	// actions: bindActionCreators(
	// 	{
	// 		createTask,
	// 		load: (line) => {
	// 			return (dispatch) => {
	// 				dispatch(actions.load('line', line))
	// 			}
	// 		}
	// 	},
	// 	dispatch
	// )
	// actions: bindActionCreators(actions, dispatch)
	// load: line => {
	// 	dispatch(actions.load("line", line));
	// }
	actions: {
		createTask: form => {
			return dispatch(createTask(form));
		}
	}
});

class TaskForm extends Component {
	state = {
		title: ""
	};

	handleChange = event => {
		const target = event.target;
		const value = target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	};

	handleSubmit = event => {
		event.preventDefault();
		this.props.actions.createTask(this.state).then(res => {
			console.log("handleSubmit(event)");
			console.log(res);
		});
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<Container>
					<Item>
						Task Name
					</Item>
					<Item>
						<input
							name="title"
							type="text"
							value={this.state.title}
							onChange={this.handleChange}
						/>
					</Item>
					<Item />
				</Container>
			</form>
		);
	}
}

export default connect(null, mapDispatchToProps)(TaskForm);
