import React, {useState, useEffect} from "react"
// import { useOutletContext } from "react-router-dom"
import { NavLink } from "react-router-dom";
import {useOutletContext} from "react-router-dom"
import Invest from './Invest'


function StockFront () {
    const [name, setName] = useState()
    const { ticker } = useOutletContext();

    // const stock = tickers.map((ticker) => (
    //     <div key={ticker.ticker}>{ticker.ticker}</div>
    //   ))

    // useEffect(() => {
    //     fetch(`http://localhost:5555//overview/${ticker}`)
    //     .then(r => r.json())
    //     .then (data => {
    //         console.log(data)
    //         setName(data)

    //     })  
    //     }, []);

return (

    <div>
        <h1>
            Stock Front:  {ticker} 
        </h1>

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