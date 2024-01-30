import React, {useState} from "react"
// import { useOutletContext } from "react-router-dom"
import { NavLink } from "react-router-dom";
import Metrics from './Metrics'


function StockBack () {


return (

    <div>
        Stock Back
        <div>
            <NavLink to="/metrics" className='nav-metrics'>
                See Metrics...
            </NavLink>
        </div>
    </div>

);

}

export default StockBack