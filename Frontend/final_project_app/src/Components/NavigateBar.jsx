import React, {useState} from 'react'
import {useOutletContext} from "react-router-dom"
// import { NavLink } from "react-router-dom";
import Logout from './Logout'
import 'bootstrap/dist/css/bootstrap.min.css';

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
<div>
    <Navbar className="navbar" bg="dark" fixed="top" variant='dark' expand="lg">
        <Navbar.Brand className="ticker-logo">Tickr</Navbar.Brand>
        <Navbar.Toggle /> 
        <Navbar.Collapse>
            <Nav>
                <Nav.Link href="/" className="nav-link">
                    Home
                </Nav.Link>
                <Nav.Link href="/search" className="nav-link" >
                    Search 
                </Nav.Link>
                <Nav.Link
                to={{ pathname: '/portfolio', key: Math.random() }}
                onClick={refreshPage}
                className="nav-link">
                Portfolio 
                </Nav.Link>
                <Logout className="nav-logout" setUser={setUser} setIsLoggedIn={setIsLoggedIn}/>
                <Nav.Link disabled className="nav-balance">
                    Balance: ${myBalance} 
                </Nav.Link>
            </Nav>
        </Navbar.Collapse>


    </Navbar>
</div>
);

};


export default NavigateBar


// {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
// <Navbar.Collapse id="basic-navbar-nav">
//     <Nav className="me-auto"> 
        // <Nav.Link href="/" className='navbar'>
        //     Home
        // </Nav.Link>
        // <Nav.Link href="/search" className='navbar'>
        //     Search 
        // </Nav.Link>
        // <Nav.Link
        //     to={{ pathname: '/portfolio', key: Math.random() }}
        //     onClick={refreshPage}
        //     className="navbar">
        //     Portfolio 
        // </Nav.Link>
//         <Container > ${myBalance}</Container>

//     {/* <Logout setUser = {setUser} setIsLoggedIn = {setIsLoggedIn}/> */}
//     </Nav>
// </Navbar.Collapse> */}








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