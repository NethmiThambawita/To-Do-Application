const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add a task"], // Correctly specifies that the name is required
        },
        completed: {
            type: Boolean,
            required: true, // Specifies that the completed field is required
            default: false, // Default value for completed tasks
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

const Task = mongoose.model("Task", taskSchema); // Correctly defines the model
module.exports = Task; // Exports the model for use in other parts of the application
