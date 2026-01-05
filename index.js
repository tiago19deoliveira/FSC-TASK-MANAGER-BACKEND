const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const taskRouter = require("./src/routes/tasks.routes");
const connectToDatabase = require("./src/database/mongoose.database");

dotenv.config();
const app = express();
app.use(cors());
connectToDatabase();

app.use("/tasks", taskRouter);

app.listen(8000, () => console.log("listening on port, 8000"));
