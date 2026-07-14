const Task = require('../models/Task');

// @desc    Get all tasks or tasks for a specific project
// @route   GET /api/tasks
// @access  Public
const getTasks = async (req, res) => {
  try {
    const query = req.query.projectId ? { projectId: req.query.projectId } : {};
    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a task
// @route   POST /api/tasks
// @access  Public
const createTask = async (req, res) => {
  const { title, description, projectId, assignee, deadline, status } = req.body;

  if (!title || !description || !projectId || !deadline) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const task = new Task({
      title,
      description,
      projectId,
      assignee,
      deadline,
      status: status || 'To Do',
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a task status or other fields
// @route   PUT /api/tasks/:id
// @access  Public
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (task) {
      task.title = req.body.title || task.title;
      task.description = req.body.description || task.description;
      task.assignee = req.body.assignee || task.assignee;
      task.deadline = req.body.deadline || task.deadline;
      task.status = req.body.status || task.status;

      const updatedTask = await task.save();
      res.json(updatedTask);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Public
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (task) {
      await Task.deleteOne({ _id: task._id });
      res.json({ message: 'Task removed' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
