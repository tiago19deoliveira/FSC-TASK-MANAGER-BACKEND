const express = require("express");
const dotenv = require("dotenv");

const connectToDatabase = require("./src/database/mongoose.database");
const TaskModel = require("./src/database/models/task.models");
dotenv.config();
const app = express();

connectToDatabase();

app.get("/tasks", async (req, res) => {
    const tasks = await TaskModel.find({});
    res.status(200).send(tasks);
});

app.listen(8000, () => console.log("listening on port, 8000"));
