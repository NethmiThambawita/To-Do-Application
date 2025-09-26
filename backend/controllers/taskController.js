const Task = require('../models/taskModel');

// Create a Task
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Get All Tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a specific Task by ID
const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${id}` });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${id}` });
    }
    res.status(200).send('Task deleted');
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//update Task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
        return res.status(404).json({ msg: `No task with id: ${id}` });
      }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Export the functions
module.exports = {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  updateTask, // Add deleteTask here
};
