import React, {useState} from 'react'
import { NavLink } from "react-router-dom";
import StockCard from './StockCard'
// import {useNavigate} from 'react-router-dom'

function Home () {


return (

<div>
    {/* <header>
        <h1> 
        <NavBar />
        </h1>
    </header> */}

    <div>
        <StockCard />
    </div>


</div>

);

}

export default Home