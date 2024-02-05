import React, {useState} from 'react'
import {useOutletContext} from "react-router-dom"
import { NavLink } from "react-router-dom";


function Navbar ({user}) {
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
        <NavLink to="/" className='navbar'>
            Home
        </NavLink>

        <NavLink to="/search" className='navbar'>
            Search 
            {/* Going to use an icon here */}
        </NavLink>

    <NavLink
        to={{ pathname: '/portfolio', key: Math.random() }}
        onClick={refreshPage}
        className="navbar"
    >
        Portfolio 
    </NavLink>
        ${myBalance}
    </div>
)
}

export default Navbar