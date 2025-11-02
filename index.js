const express = require("express");
const dotenv = require("dotenv");
const taskRouter = require("./src/routes/tasks.routes");

const connectToDatabase = require("./src/database/mongoose.database");

dotenv.config();
const app = express();

connectToDatabase();

app.use("/tasks", taskRouter);

app.listen(8000, () => console.log("listening on port, 8000"));
