import React, {useState, useEffect} from "react"
import { useOutletContext, useLocation } from "react-router-dom"
// import App from '../App.jsx'
import StockFront from './StockFront'
import StockBack from './StockBack'

function StockCard () {
    const [frontCard, setFrontCard] = useState(true)
    const { stock, setStock, handleRandomStock } = useOutletContext();
    const location = useLocation() 


    function flipCard() {
        setFrontCard(!frontCard)
    }


return (

    <div>


        <div>
            {frontCard ? 
            <StockFront/> 
            : 
            <StockBack />
            }
        </div>
        <button onClick={handleRandomStock}> Random Stock</button>
        <br></br>
        <button onClick={flipCard}> Flip Card </button>

    </div>

);

}

export default StockCard