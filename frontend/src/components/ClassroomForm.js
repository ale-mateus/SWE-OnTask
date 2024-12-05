import { useState } from "react";
import { useClassContext } from "../hooks/useClassContext";
import { useAuthContext } from '../hooks/useAuthContext';

const ClassroomForm = () => {
  const { dispatch } = useClassContext();
  const { user } = useAuthContext();

  const [email, setEmail] = useState(user.email);
  const [code, setCode] = useState('');
  const [classroomName, setClassroomName] = useState('');
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    // Validate form fields
    if (!classroomName || !code || !email) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('/api/classes', {
        method: 'POST',
        body: JSON.stringify({classroomName, code, email}),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        const json = await response.json();
        setError(json.error || 'Something went wrong');
      } else {
        const json = await response.json();
        // Save the class info to local storage
        localStorage.setItem('class', JSON.stringify(json));

        // Update the class context
        dispatch({ type: 'CREATE_CLASS', payload: { ...json, id: json._id } });

        window.location.reload(); // Reload the page to reflect the new class
      }

      // response again
      const responseTwo = await fetch('/api/user', {
        method: 'PATCH', // or PUT depending on your API design
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            email: user.email,  // Include the user's email for identification
            newCode: code,   // Include the new code
          }),
      });

      const jsonTwo = await responseTwo.json();

      if (!responseTwo.ok) {
        throw new Error(jsonTwo.error || 'Failed to update code');
      }
      else {
        localStorage.setItem('class', JSON.stringify(jsonTwo));
        dispatch({ type: 'UPDATE_CODE', payload: { code: code } });
      }

    } catch (error) {
      console.error('Fetch error:', error);
      setError('An error occurred while creating the class.');
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button onClick={openModal} className="create-class-button">Create Class</button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <form className="create-class" onSubmit={handleSubmit}>
              <h3>Create a New Class</h3>

              <label>Class Name:</label>
              <input
                type="text"
                onChange={(e) => setClassroomName(e.target.value)}
                value={classroomName}
              />

              <label>Class Code:</label>
              <input
                type="text"
                onChange={(e) => setCode(e.target.value)}
                value={code}
              />

              <input
                type="hidden"
                value={email}
              />

              <button type="submit" className="submit" disabled={!classroomName || !code || !email}>
                Create Class
              </button>
              {error && <div className="error">{error}</div>}

              <button type="button" onClick={closeModal} className="close-modal">
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ClassroomForm;
