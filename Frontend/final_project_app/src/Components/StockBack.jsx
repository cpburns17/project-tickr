import React, {useState} from "react"
import { useOutletContext } from "react-router-dom"
import { NavLink } from "react-router-dom";
import Metrics from './Metrics'


function StockBack () {
    const {quote, stock,} = useOutletContext()

    const parseHigh = parseFloat(quote?.high);
    const parseLow = parseFloat(quote?.low);
    const parseOpen = parseFloat(quote?.open);
    const parseClose = parseFloat(quote?.previous_close);
    const parsePrice = parseFloat(quote?.price);



return (

    <div>
        <h1> Stock Back</h1>
        {/* <p>Price: ${parsePrice.toFixed(2)}</p> */}
        <p>High: ${parseHigh.toFixed(2)}</p>
        <p>Low: ${parseLow.toFixed(2)}</p>
        <p>Open: ${parseOpen.toFixed(2)}</p>
        <p>Previous Close: ${parseClose.toFixed(2)}</p>
        {/* <p>Volume: {quote?.volume}</p> */}

        <div>
            <NavLink to="/metrics" className='nav-metrics'>
                See Metrics
            </NavLink>
        <br></br>
            <NavLink to="/news" className='nav-news'>
                Market News
            </NavLink>
        </div>
    </div>

);

}

export default StockBack