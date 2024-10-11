import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Home from './pages/TeacherCreate'
import Home from './pages/StudentParentCreate'
import Home from './pages/DeleteTeacher'
import Home from './pages/DeleteStudentParent'

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