import React, {useState, useEffect} from "react"
// import { useOutletContext } from "react-router-dom"
import { NavLink } from "react-router-dom";
import {useOutletContext} from "react-router-dom"
import Invest from './Invest'


function StockFront () {
    const { stock, intraday} = useOutletContext();

    const closeValue = parseFloat(intraday?.close);


return (

    <div>
        <h1>
            {stock?.name}
        </h1>
        <h2>
            {stock?.symbol}
        </h2>
        <h2>
            PPS: ${isNaN(closeValue) ? "N/A" : closeValue.toFixed(2)}
        </h2>
        <p> tickr: {stock?.symbol}</p>
        {/* <p> Company: {stock?.name} </p> */}
        <p> Exchange: {stock?.exchange}</p>
        <p>{stock?.currensy}</p>
        <p> Industry: {stock?.industry}</p>
        <p> Description: {stock?.description}</p>

        

        <div>
            <NavLink to="/invest" className='nav-invest'>
                Click here to invest
            </NavLink>
        </div>
        {/* <Invest /> */}
    </div>

);

}

export default StockFront