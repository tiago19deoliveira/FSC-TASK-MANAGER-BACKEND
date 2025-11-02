const express = require("express");
const router = express.Router();

const TaskController = require("../controller/task.controller");
const TaskModel = require("../models/task.models");

router.get("/", async (req, res) => {
    return new TaskController(req, res).getAll();
});

router.get("/:id", async (req, res) => {
    return new TaskController(req, res).getbyId(id);
});

router.post("/", async (req, res) => {
    return new TaskController(req, res).create();
});

router.patch("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskData = req.body;
        const taskToUpdate = await TaskModel.findById(taskId);
        const allowedupdates = ["isCompleted"];
        const requestUpdates = Object.keys(taskData);

        for (update of requestUpdates) {
            if (allowedupdates.includes(update)) {
                taskToUpdate[update] = taskData[update];
            } else {
                return res
                    .status(400)
                    .send("Um ou mais campos inseridos não são editáveis");
            }
        }

        await taskToUpdate.save();

        return res.status(200).send(taskToUpdate);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskToDelete = await TaskModel.findById(taskId);
        if (!taskToDelete) {
            return res.status(500).send("Essa tarefa não foi encontrada");
        }
        const deleteTask = await TaskModel.findByIdAndDelete(taskId);
        return res.status(200).send(deleteTask);
    } catch (error) {
        console.error(error.message);
    }
});

module.exports = router;
