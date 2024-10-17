import React, { useEffect, useState } from "react";
import "./SignUpPageStyles.css";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const SignUpPage = () => {
    
    return (
 <div className="wrapper">
    <div className="Title">
        <h1>Welcome to OnTask!</h1>
    </div>
    <div className="container">
        <p>Are you a Teacher or a Student/Parent?</p>
        <div className="Buttons">
        <Link to="/teacher/login" className="teacher-button"> {/* Update the path here */}
            I'm a Teacher
        </Link>
        </div>
    </div>
</div>    
)
}

export default SignUpPage