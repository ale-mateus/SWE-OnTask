import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Account = () => {
  const { user, dispatch } = useAuthContext();
  const [classroomData, setClassroomData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [teacherCode, setTeacherCode] = useState("");
  const [parentCode, setParentCode] = useState(""); // Added state for parent code
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  // Fetch classroom data for teacher or student
  useEffect(() => {
    if (user) {
      console.log("user.code: ", user.code);
      const fetchClassroom = async () => {
        try {
          let endpoint = "";
          if (user.role === "teacher") {
            endpoint = `/api/classes/by-email?email=${user.email}`;
          } else if (user.role === "student" && user.code) {
            endpoint = `/api/classes/by-code/${user.code}`;
          }

          if (endpoint) {
            console.log("Fetching data from endpoint:", endpoint);
            const response = await fetch(endpoint, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            });

            if (!response.ok) {
              throw new Error(`Failed to fetch classroom: ${response.status} ${response.statusText}`);
            }

            const contentType = response.headers.get("Content-Type");
            if (contentType && contentType.includes("application/json")) {
              const data = await response.json();
              console.log("Fetched data:", data);
              setClassroomData(data);
            } else {
              const errorText = await response.text();
              throw new Error(`Unexpected response format: ${errorText}`);
            }
          }
        } catch (error) {
          console.error("Error fetching classroom:", error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchClassroom();
    }
  }, [user]);

  // Handle teacher code input submission for students
  const handleTeacherCodeSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess("");
    setLoading(true);

    if (!user) {
      setError("User is not logged in");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          email: user.email,
          newCode: teacherCode,
        }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || "Failed to join the class.");
      }

      // Update user context and local storage
      const updatedUser = { ...user, code: teacherCode };
      dispatch({ type: "LOGIN", payload: updatedUser });
      localStorage.setItem("user", JSON.stringify(updatedUser));

      console.log("Classroom data after join:", json);
      setClassroomData(json);
      setSuccess("Successfully joined the class!");
    } catch (err) {
      console.error("Error joining class:", err);
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle parent code input submission for students
  const handleParentCodeSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess("");
    setLoading(true);

    if (!user) {
      setError("User is not logged in");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/user/", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          email: user.email,
          parentCode: parentCode, // Sending parent code here
        }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || "Failed to link to the parent.");
      }

      // Update user context and local storage
      const updatedUser = { ...user, parentCode: parentCode };
      dispatch({ type: "LOGIN", payload: updatedUser });
      localStorage.setItem("user", JSON.stringify(updatedUser));

      console.log("Parent code data after join:", json);
      setSuccess("Successfully linked to the parent!");
    } catch (err) {
      console.error("Error linking to parent:", err);
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to view your account details.</div>;
  }

  return (
    <div className="account">
      <h1>Account Info</h1>
      <p>Account Type: {user.role}</p>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>

      {user.role === "teacher" && (
        <>
          {classroomData ? (
            <>
              <p>Class Name: {classroomData.classroomName}</p>
              <p>Class Code: {classroomData.code}</p>
            </>
          ) : (
            <p>No classroom associated with this email.</p>
          )}
        </>
      )}

      {user.role === "student" && (
        <>
          {!classroomData && (
            <form onSubmit={handleTeacherCodeSubmit}>
              <label>
                Enter Teacher's Code:
                <input
                  type="text"
                  value={teacherCode}
                  onChange={(e) => setTeacherCode(e.target.value)}
                  required
                />
              </label>
              <button type="submit">Submit</button>
            </form>
          )}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
          {classroomData ? (
            <>
              <p>Class Name: {classroomData.classroomName}</p>
              <p>Class Code: {classroomData.code}</p>
              <p>Teacher's Email: {classroomData.email}</p>
            </>
          ) : (
            <p>No classroom associated yet.</p>
          )}

          {/* Parent Code Form */}
          {!user.parentCode && (
            <form onSubmit={handleParentCodeSubmit}>
              <label>
                Enter Parent's Code:
                <input
                  type="text"
                  value={parentCode}
                  onChange={(e) => setParentCode(e.target.value)}
                  required
                />
              </label>
              <button type="submit">Submit</button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default Account;
