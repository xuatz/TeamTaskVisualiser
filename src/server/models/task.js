const mongoose = require("./mongoose.js");
const Schema = mongoose.Schema;

const Task = mongoose.model(
	"Task",
	new Schema(
		{
			userId: { type: Schema.Types.ObjectId },
			title: { type: Schema.Types.String }
		},
		{
			timestamps: true,
			strict: false
		}
	)
);

module.exports = Task;
