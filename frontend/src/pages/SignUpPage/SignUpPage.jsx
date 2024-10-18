import React, { useState } from "react"; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "./SignUpPageStyles.css";

const SignUpPage = () => {
    const [selectedRole, setSelectedRole] = useState('student');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleButtonClick = (buttonName, route) => {
        setSelectedRole(buttonName === selectedRole ? null : buttonName);
        if (buttonName !== selectedRole) {
            navigate(route); // Navigate to the specified route
        }
    };

    const renderStudentForm = () => (
        <form onSubmit={handleSignUp}>
            <input
                type="text"
                name="name"
                placeholder="Student Name"
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                required
            />
        </form>
    );

    const renderTeacherForm = () => (
        <form onSubmit={handleSignUp}>
            <input
                type="text"
                name="className"
                placeholder="Class Name"
                required
            />
            <input
                type="text"
                name="name"
                placeholder="Teacher Name"
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                required
            />
        </form>
    );
    
    const handleSignUp = (event) => {
        event.preventDefault();
        // Add your signup logic here (e.g., API call)
    };

    return (
        <div className="wrapper">
            
            <div className="Title">
                <h1>Welcome to OnTask!</h1>
            </div>

            <div className="container">
                <h1>Create Account</h1>
                <div className="RoleFormContainer">
                    {selectedRole === 'student' && renderStudentForm()}
                    {selectedRole === 'teacher' && renderTeacherForm()}
                </div>
                <p>Are you a Teacher or a Student/Parent?</p>
                <div className="RoleButtonsContainer">
                    <button 
                        className={`role-button ${selectedRole === 'student' ? 'active' : ''}`} 
                        onClick={() => handleButtonClick('student', '#')}
                    >
                        I'm a Student/Parent
                    </button>
                    <button 
                        className={`role-button ${selectedRole === 'teacher' ? 'active' : ''}`} 
                        onClick={() => handleButtonClick('teacher', '#')}
                    >
                        I'm a Teacher
                    </button>
                </div>
                <div className="SubmitButtonContainer">
                <button type="submit" className="sign-up-button">Sign Up</button>
                </div>
            </div>
        </div>    
    );
}

export default SignUpPage;
