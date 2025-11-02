const express = require("express");
const dotenv = require("dotenv");

const connectToDatabase = require("./src/database/mongoose.database");
const TaskModel = require("./src/database/models/task.models");
dotenv.config();
const app = express();

connectToDatabase();

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await TaskModel.find({});
        res.status(200).send(tasks);
    } catch (e) {
        res.status(500).send(error.message);
    }
});

app.post("/tasks", async (req, res) => {
    try {
        const newTask = new TaskModel(req.body);
        await newTask.save();
        res.status(201).send(newTask);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.listen(8000, () => console.log("listening on port, 8000"));
