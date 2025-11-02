const TaskModel = require("../models/task.models");

class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    async getAll() {
        try {
            const tasks = await TaskModel.find({});
            this.res.status(200).send(tasks);
        } catch (e) {
            this.res.status(500).send(error.message);
        }
    }

    async getbyId() {
        try {
            const taskId = this.req.params.id;
            const task = await TaskModel.findById(taskId);

            if (!task) {
                return this.res
                    .status(404)
                    .send("Essa tarefa não foi encontrada!");
            }

            return this.res.status(200).send(task);
        } catch (e) {
            return this.res.status(500).send(error.message);
        }
    }
    async create() {
        try {
            const newTask = new TaskModel(this.req.body);
            await newTask.save();
            this.res.status(201).send(newTask);
        } catch (error) {
            return this.res.status(400).send(error.message);
        }
    }
    async update() {
        try {
            const taskId = this.req.params.id;
            const taskData = this.req.body;
            const taskToUpdate = await TaskModel.findById(taskId);
            const allowedupdates = ["isCompleted"];
            const requestUpdates = Object.keys(taskData);

            for (const update of requestUpdates) {
                if (allowedupdates.includes(update)) {
                    taskToUpdate[update] = taskData[update];
                } else {
                    return this.res
                        .status(400)
                        .send("Um ou mais campos inseridos não são editáveis");
                }
            }

            await taskToUpdate.save();

            return this.res.status(200).send(taskToUpdate);
        } catch (error) {
            return this.res.status(500).send(error.message);
        }
    }
    async delete() {
        try {
            const taskId = this.req.params.id;
            const taskToDelete = await TaskModel.findById(taskId);
            if (!taskToDelete) {
                return this.res
                    .status(500)
                    .send("Essa tarefa não foi encontrada");
            }
            const deleteTask = await TaskModel.findByIdAndDelete(taskId);
            return this.res.status(200).send(deleteTask);
        } catch (error) {
            console.error(error.message);
        }
    }
}

module.exports = TaskController;
