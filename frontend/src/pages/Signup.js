import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, error, isLoading } = useSignup();
  const [selectedRole, setSelectedRole] = useState('student');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Pass email, password, and selected role to signup
    await signup(email, password, selectedRole);
  };

  const handleButtonClick = (buttonName) => {
    setSelectedRole(buttonName === selectedRole ? selectedRole : buttonName);
  };

  return (
    <div className="login-page">
      <div className="login-content">
        <div className="left-section">
          <h2>Welcome to OnTask!</h2>
          <p>This website is made to enhance communication among teachers, parents, and students. Users can track assignments, view announcements, and access a weekly calendar. Our platform improves organization and clarity, ensuring a user-friendly experience while safeguarding sensitive information.</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <h3>Sign Up</h3>
          
          {selectedRole === 'student' && (
            <>
              <label>Student Name:</label>
              <input type="text" name="name" required />
            </>
          )}
          
          {selectedRole === 'teacher' && (
            <>
              <label>Class Name:</label>
              <input type="text" name="className" required />
              <label>Name:</label>
              <input type="text" name="name" required />
            </>
          )}
          
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
      </div>
    </div>
  );
};

export default Signup;
