// import React, { useState } from 'react';
// import { useNavigate, useOutletContext } from 'react-router-dom'; 

// function Logout() {
//     const {setUser, setIsLoggedIn} = useOutletContext()

//     const navigate = useNavigate();

//     const handleLogout = () => {
//     fetch('/api/logout', {
//         method: 'DELETE'
//     })
//         .then((r) => r.json())
//         .then((data) => {
//         console.log('Session ended: ', data)
//         setIsLoggedIn(false)
//         setUser(null)
//         navigate('/')
//         })
//     };

//     return (
//     <button onClick={handleLogout}>
//         Logout
//     </button>
//     );
// }

// export default Logout;