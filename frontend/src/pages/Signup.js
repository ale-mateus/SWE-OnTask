import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, error, isLoading, signupClass } = useSignup();
  const [selectedRole, setSelectedRole] = useState('student');

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password, selectedRole);
  };
/*
  const handleClassClick = async (e) => {
    e.preventDefault()

    await signupClass(email, classroomName, code);
  }*/

  const handleButtonClick = (buttonName) => {
    setSelectedRole(buttonName === selectedRole ? selectedRole : buttonName);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      
      <label>Name:</label>
      <input type="text" name="name" required />
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />

      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />
      
      <div className="RoleButtonsContainer">
        <button 
          className={`role-button ${selectedRole === 'student' ? 'active' : ''}`} 
          type="button" 
          onClick={() => handleButtonClick('student')}
        >
          I'm a Student/Parent
        </button>
        <button 
          className={`role-button ${selectedRole === 'teacher' ? 'active' : ''}`} 
          type="button" 
          onClick={() => handleButtonClick('teacher')}
        >
          I'm a Teacher
        </button>
      </div>
      
      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};


export default Signup;
