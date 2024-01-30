import React, {useState} from 'react'
import { NavLink } from "react-router-dom";
// import {useNavigate} from 'react-router-dom'

function Navbar () {


return (
    <div>
        <NavLink to="/home" className='navbar'>
            Home
        </NavLink>

        <NavLink to="/search" className='navbar'>
            Search 
            {/* Going to use an icon here */}
        </NavLink>

        <NavLink to='/portfolio' className='navbar'>
            Portfolio
        </NavLink>
    </div>
)
}

export default Navbar