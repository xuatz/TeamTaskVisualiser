import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Container, Item } from "./common/FlexContainer";
import { createTask } from "../actions/taskActions";

import TaskForm from "./TaskForm";
import TasksList from "./TasksList";

class TasksPage extends Component {
	render() {
		// alternatively, we could make a connected component here, and pass down the necessary props
		return (
			<div>
				<TaskForm />
				<TasksList />
			</div>
		);
	}
}

export default TasksPage;
