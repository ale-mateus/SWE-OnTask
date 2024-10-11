import mongoose from 'mongoose';

const teacherSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    }
});

export const Teacher = mongoose.model('Teacher', teacherSchema);