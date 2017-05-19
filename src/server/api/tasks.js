const express = require("express");
const router = express.Router();

const Task = require("../models/task");

router.use((req, res, next) => {
	console.log("/tasks generic check!");
	if (req.method === "OPTIONS") {
		next();
	} else if (req.user) {
		next();
	} else {
		res.sendStatus(401);
	}
});

router.post("/", (req, res) => {
	// console.log("req.session", req.session);
	// console.log("req.user.id", req.user.id);
	Task.create(
		Object.assign({}, req.body.data, {
			userId: req.user.id
		})
	)
		.then(newTask => {
			console.log(newTask);
			res.json({
				msg: "OK",
				task: newTask
			});
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});

	// console.log('req.session.cookie', req.session.cookie);
	// console.log('req.session.id', req.session.id);
	// console.log('req.sessionID', req.sessionID);
});

router.get("/", (req, res) => {
	Task.find({
		userId: req.user.id
	})
		.exec()
		.then(tasks => {
			res.json({
				msg: "OK",
				tasks
			});
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});

module.exports = router;
