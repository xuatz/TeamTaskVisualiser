import axios from "axios";
import Promise from "bluebird";

let API = axios.create({
	baseURL: process.env.REACT_APP_API_URL || "http://localhost:9000",
	withCredentials: true,
	timeout: 5000
});

export const createTask = form => {
	return dispatch => {
		return API.post("/tasks", {
			data: form
		})
			.then(res => {
				if (res.status === 200) {
					dispatch({ type: "TASK_ADDED", task: res.data.task });
				} else {
					//TODO xz: display error message on client
				}
				return res.status;
			})
			.catch(err => {
				console.log(err);
				//TODO xz: handle error gracefully on client
				// alert("there is an error!");
			});
	};
};

export const fetchTasks = form => {
	return dispatch => {
		return API.get("/tasks")
			.then(res => {
				console.log(res);
				if (res.status === 200) {
					dispatch({ type: "TASKS_FETCHED", tasks: res.data.tasks });
				} else {
					//TODO xz: display error message on client
				}
				return res.status;
			})
			.catch(err => {
				console.log(err);
				//TODO xz: handle error gracefully on client
				// alert("there is an error!");
			});
	};
};
