import React, {useState, useEffect} from "react"
import { useOutletContext, useLocation } from "react-router-dom"

import StockFront from './StockFront'
import StockBack from './StockBack'

// Bootstrap
import Button from 'react-bootstrap/Button';

function StockCard () {
    const { stock, setStock, handleRandomStock } = useOutletContext();
    const [frontCard, setFrontCard] = useState(true)
    const location = useLocation() 


    function flipCard() {
        setFrontCard(!frontCard)
    }


return (
    <div className="stock-card-container">
        <div>
            {frontCard ? 
            <StockFront flipCard={flipCard}/> 
            : 
            <StockBack flipCard={flipCard}/>
            }
        </div>
        <br></br>
        <Button onClick={handleRandomStock} variant="success"> Random Stock</Button>
    </div>

);

};

export default StockCard