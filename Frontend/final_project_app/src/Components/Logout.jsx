import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom'; 

import Button from 'react-bootstrap/Button';

function Logout({setUser, setIsLoggedIn, user}) {
    // const {setUser, setIsLoggedIn} = useOutletContext()

    const navigate = useNavigate();

    const handleLogout = () => {
    fetch('/api/logout', {
        method: 'DELETE'
    })
        .then((r) => r.json())
        .then((data) => {
        console.log('Session ended: ', data)
        setIsLoggedIn(false)
        setUser(null)
        navigate('/welcome')
        })
    };

    return (
    <button onClick={handleLogout} className="nav-link">
        Logout
    </button>
    );
}

export default Logout;