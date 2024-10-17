import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage/SignUpPage'
import TeacherCreate from './pages/TeacherCreate'
import StudentParentCreate from './pages/StudentParentCreate'
import DeleteTeacher from './pages/DeleteTeacher'
import DeleteStudentParent from './pages/DeleteStudentParent'
import Login from './pages/LoginPage/Login';
import LandingPage from './pages/LandingPage/LandingPage'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/teacher/create" element={<TeacherCreate />} />
      <Route path="/teacher/signup" element={<SignUpPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/student/create" element={<StudentParentCreate />} />
      <Route path="/teacher/delete/:id" element={<DeleteTeacher />} />
      <Route path="/student/delete/:id" element={<DeleteStudentParent />} />
      
    </Routes>
  )
}

export default App