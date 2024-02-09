import React, {useState} from 'react'
import { NavLink } from "react-router-dom";
import StockCard from './StockCard'
// import {useNavigate} from 'react-router-dom'

function Home () {


return (

<div className='body-container'>
    {/* <header>
        <h1> 
        <NavBar />
        </h1>
    </header> */}

    <div>
        <StockCard className="stock-card"/>
    </div>


</div>

);

}

export default Home