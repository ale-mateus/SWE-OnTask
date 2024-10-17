import React from "react";
import './LoginStyles.css';

const Login = () => {
    return (
        <div className="wrapper">
            <div className="Title">
                OnTask
            </div>
            <div className="LoginContainer">
                <form action="">
                    <div className="FormContainer">

                    <h1 className="LoginTitle">Login</h1>

                    <div className="input-box">
                        <input type="text" placeholder="Username" required />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required />
                    </div>

                    <div className="remember-forgot">
                        <label className="remember-checkbox">
                            <input type="checkbox" /> Remember me
                        </label>
                        <a href="#" className="forgot-link">Forgot password?</a>
                    </div>

                    <button type="submit" className="login-button">Login</button>

                    <div className="register-link">
                        <p>Don't have an account? <a href="#">Register</a></p>
                    </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;