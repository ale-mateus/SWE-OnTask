const Class = require('../models/classModel');

const createClassroom = async (req, res) => {
  console.log("Request received:", req.body); // Log the request body to see what was sent
  console.log("Authenticated user:", req.user); // Log the authenticated user (should be populated by requireAuth)

  const { name, code, teacher } = req.body;
  let emptyFields = [];

  if (!name) emptyFields.push('name');
  if (!code) emptyFields.push('code');
  if (!teacher) emptyFields.push('teacher');

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
  }

  try {
    console.log("Attempting to create class...");
    const classroom = await Class.create({ name, code, teacher });
    console.log("Class saved:", classroom); // Log the saved classroom to check if it's stored
    res.status(200).json(classroom);
  } catch (error) {
    console.error("Error creating class:", error); // Log error if creation fails
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createClassroom };
