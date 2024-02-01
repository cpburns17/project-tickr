import React, {useState, useEffect} from "react"
import { useOutletContext } from "react-router-dom"
// import App from '../App.jsx'
import StockFront from './StockFront'
import StockBack from './StockBack'

function StockCard () {
    const [frontCard, setFrontCard] = useState(true)
    const { stock, setStock, handleRandomStock } = useOutletContext();


    function flipCard() {
        setFrontCard(!frontCard)
    }


return (

    <div>

        <button onClick={handleRandomStock}> Random Stock</button>


        <div>
            <button onClick={flipCard}> Flip Card </button>
            {frontCard ? 
            <StockFront/> 
            : 
            <StockBack />
            }
        </div>

    </div>

);

}

export default StockCard