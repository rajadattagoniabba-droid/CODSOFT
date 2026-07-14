const express = require('express');
const router = express.Router();
const {
  getProjects,
  createProject,
  getProjectById,
  deleteProject,
} = require('../controllers/projectController');

router.route('/').get(getProjects).post(createProject);
router.route('/:id').get(getProjectById).delete(deleteProject);

module.exports = router;
