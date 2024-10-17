import React, { useEffect, useState } from "react";
import "./LandingPageStyles.css";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const LandingPage = () => {
    
    return (
 <div className="wrapper">
    <div className="Title">
        <h1>Welcome to OnTask!</h1>
    </div>
    <div className="LandingPageContainer">
        <p>Thank you for choosing the greatest calendar app ever created!</p>
        <div className="LandingButton">
        <Link to="/login" className="login-button"> {/* Update the path here */}
            Lets Go!
        </Link>
        </div>
    </div>
</div>    
)
}

export default LandingPage