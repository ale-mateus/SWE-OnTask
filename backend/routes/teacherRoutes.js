import express from 'express';
import { Teacher } from '../models/teacherModel.js';

const router = express.Router();

// Route to make a new teacher account
router.post('/', async(request, response) => {
    try{
        // Check if email and password are provided
        if(!request.body.email || !request.body.password){
            return response.status(400).send({ message: 'Please enter email and password' });
        }
        // Create a new teacher object
        const newTeacher = {
            email: request.body.email,
            password: request.body.password,
        };
        
        const teacher = await Teacher.create(newTeacher);

        // 201 status code means that a new teacher has been created
        return response.status(201).send(teacher);

    }catch(error){ // Error handling
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route to get all teachers from database
router.get('/', async(request, response) => {
    try{
        const teachers = await Teacher.find({});
        return response.status(200).json({
            count: teachers.length,
            data: teachers
        });
    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route to get one teacher from database by id
router.get('/:id', async(request, response) => {
    try{

        const { id } = request.params;

        const teacher = await Teacher.findById(id);

        return response.status(200).json(teacher);
    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route to update a teacher
router.put('/:id', async(request, response) => {
    try{
        if(!request.body.email || !request.body.password){
            return response.status(400).send({ message: 'Send all required fields: email and password' });
        }

        const { id } = request.params;

        const result = await Teacher.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).json({ message: 'Teacher not found' });
        }
        return response.status(200).send({ message: 'Teacher updated successfully' });

    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route to delete a teacher
router.delete('/:id', async(request, response) => {
    try{
        const { id } = request.params;

        const result = await Teacher.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({ message: 'Teacher not found' });
        }
        return response.status(200).send({ message: 'Teacher deleted successfully' });

    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;