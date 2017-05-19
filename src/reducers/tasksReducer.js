const initialState = {
	// isCheckingSession: true,
	// isLoggedIn: false
};

export default (state = [], action) => {
	switch (action.type) {
		case "TASK_ADDED":
			return state.concat(action.task);
		case "TASKS_FETCHED":
			return action.tasks;
		default:
			return state;
	}
};
