import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import TeacherCreate from './pages/TeacherCreate'
import StudentParentCreate from './pages/StudentParentCreate'
import DeleteTeacher from './pages/DeleteTeacher'
import DeleteStudentParent from './pages/DeleteStudentParent'
import Schedule from './Schedule.jsx'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/teacher/create" element={<TeacherCreate />} />
      <Route path="/student/create" element={<StudentParentCreate />} />
      <Route path="/teacher/delete/:id" element={<DeleteTeacher />} />
      <Route path="/student/delete/:id" element={<DeleteStudentParent />} />
    </Routes>
  )
}

export default App
