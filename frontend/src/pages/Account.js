import React, { useEffect, useState, useCallback } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";

const Account = () => {
    const { user } = useAuthContext();
    const storedClass = localStorage.getItem('class');
    const classroom = storedClass ? JSON.parse(storedClass) : null;

    return(
        <div className='account'>
            <h1>Account Info</h1>
            <p>Account Type: {user.role}</p>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            {user.role === 'student' && <p>Teacher's Email: {classroom.email}</p>}
            <p>Class Name: {classroom.classroomName}</p>
            <p>Class Code: {user.code}</p>
        </div>
    )
}

export default Account