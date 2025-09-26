const express = require('express');
const Task = require("../models/taskModel")
const { createTask, getTasks, getTask, deleteTask,updateTask } = require('../controllers/taskController');
const router = express.Router();

// router.route("/").get(getTasks).post(createTask)
// router.route("/:id").get(getTask).delete(deleteTask).put(updateTask)

// Route for creating a task
router.post('/', createTask);

// Route for getting all tasks
router.get('/', getTasks);

// Route for getting a task by ID
router.get('/:id', getTask);

router.delete('/:id',deleteTask);

router.put('/:id',updateTask);

module.exports = router;
