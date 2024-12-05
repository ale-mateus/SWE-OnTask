import React, { useEffect, useState, useCallback } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";

const Account = () => {
    const { user } = useAuthContext();

    return(
        <div className='account'>
            <h1>Account Info</h1>
            <p>Account Type: {user.role}</p>
            <p>Name: [fix later]</p>
            <p>Email: {user.email}</p>
            {user.role === 'student' && <p>Teacher's Name: [fix later]</p>}
            <p>Class Name: [fix later]</p>
            <p>Class Code: [fix later]</p>
        </div>
    )
}

export default Account