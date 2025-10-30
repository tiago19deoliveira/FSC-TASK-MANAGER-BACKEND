const mongoose = require("mongoose");

const connectToDatabase = async () => {
    await mongoose.connect(
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@fsctaskmanagercluster.c2oprob.mongodb.net/?appName=FscTaskManagerCluster`
    );
    console.log("Connected to MongoDb");
};

module.exports = connectToDatabase;
