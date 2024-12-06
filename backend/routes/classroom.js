const express = require('express');
const { createClassroom, getClassroomByEmail, getClassroomByCode } = require('../controllers/classController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Apply authentication middleware for the class creation route
router.use(requireAuth);

// POST a new classroom
router.post('/', createClassroom);

// GET classroom by email
router.get('/by-email', getClassroomByEmail);

// GET classroom by code (Add this route)
router.get('/by-code/:code', getClassroomByCode);

module.exports = router;
