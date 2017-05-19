import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Container, Item } from "./common/FlexContainer";
import { fetchTasks } from "../actions/taskActions";

import Reactable from "./common/Reactable";

const mapStateToProps = state => {
	return {
		tasks: state.tasks
	};
};

const mapDispatchToProps = dispatch => ({
	actions: {
		fetchTasks: () => dispatch(fetchTasks())
	}
});

class TasksList extends Component {
	componentDidMount() {
		this.props.actions
			.fetchTasks()
			.then(res => {
				// console.log(res)
			})
			.catch(err => {
				// it is possible that we do not handle error here,
				// perhaps the action creator will return the necessary UI info to render error thru res, etc
				// console.log(res)
			});
	}

	render() {
		//console.log(this.state);
		return <Reactable tasks={this.props.tasks} />;
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);
