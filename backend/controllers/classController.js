const Class = require('../models/classModel');

const createClassroom = async (req, res) => {
  console.log("Request received:", req.body); // Log the request body to see what was sent
  console.log("Authenticated user:", req.user); // Log the authenticated user (should be populated by requireAuth)

  const { classroomName, code, email } = req.body;
  let emptyFields = [];

  if (!classroomName) emptyFields.push('classroomName');
  if (!code) emptyFields.push('code');
  if (!email) emptyFields.push('email');

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
  }

  try {
    console.log("Attempting to create class...");
    const classroom = await Class.create({ classroomName, code, email });
    console.log("Class saved:", classroom); // Log the saved classroom to check if it's stored
    res.status(200).json(classroom);
  } catch (error) {
    console.error("Error creating class:", error); // Log error if creation fails
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createClassroom };
