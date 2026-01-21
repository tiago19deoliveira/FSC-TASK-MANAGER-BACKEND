const { Schema, model } = require("mongoose");

const TaskSchema = Schema({
    description: {
        type: String,
        required: false,
        default: "",
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
});

const TaskModel = model("Task", TaskSchema);

module.exports = TaskModel;
