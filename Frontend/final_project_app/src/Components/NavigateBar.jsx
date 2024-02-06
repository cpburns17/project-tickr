import React, {useState} from 'react'
import {useOutletContext} from "react-router-dom"
// import { NavLink } from "react-router-dom";
// import Logout from './Logout'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';



function NavigateBar ({user, setUser, setIsLoggedIn}) {
    const parseBalance = parseFloat(user?.balance);
    const myBalance = parseBalance.toFixed(0);
    // console.log(myBalance)

    const refreshPage = () => {
        // This function generates a new key to force remount
        const key = Math.random();
        window.location.href = `/portfolio?key=${key}`;
    };


return (

<Navbar expand="lg" className="bg-body-tertiary">
    <Container> 
        <Nav.Link href="/" className='navbar'>
            Home
        </Nav.Link>

        <Nav.Link href="/search" className='navbar'>
            Search 
            {/* Going to use an icon here */}
        </Nav.Link>

    <Nav.Link
        to={{ pathname: '/portfolio', key: Math.random() }}
        onClick={refreshPage}
        className="navbar"
    >
        Portfolio 
    </Nav.Link>
        ${myBalance}
    {/* <Logout setUser = {setUser} setIsLoggedIn = {setIsLoggedIn}/> */}
    </Container>
</Navbar>


);

};


export default NavigateBar


// {/* <div>
// <Nav.Link to="/" className='navbar'>
//     Home
// </Nav.Link>

// <Nav.Link to="/search" className='navbar'>
//     Search 
//     {/* Going to use an icon here */}
// </Nav.Link>

// <Nav.Link
// to={{ pathname: '/portfolio', key: Math.random() }}
// onClick={refreshPage}
// className="navbar"
// >
// Portfolio 
// </Nav.Link>
// ${myBalance}
// {/* <Logout setUser = {setUser} setIsLoggedIn = {setIsLoggedIn}/> */}
// </div> */}