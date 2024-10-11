import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import teacherRoutes from "./routes/teacherRoutes.js";
import cors from "cors";

const app = express();

// Middleware to parse the request body
app.use(express.json());

// Middleware for handeling CORS POLICY
// Option 1: Allowing All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allowing Custom Origin
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// )

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to MERN Stack Tutorial');
});

app.use('/teacher', teacherRoutes);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
