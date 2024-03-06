import React, {useState, useEffect} from "react"
import { useOutletContext, useLocation } from "react-router-dom"

import StockFront from './StockFront'
import StockBack from './StockBack'

// Bootstrap
import Button from 'react-bootstrap/Button';

function StockCard () {
    const { stock, setStock, handleRandomStock, handleRandomCrypto, cryptoIntraday } = useOutletContext();
    const [frontCard, setFrontCard] = useState(true)
    const location = useLocation() 


    function flipCard() {
        setFrontCard(!frontCard)
    }

    // console.log(cryptoIntraday)


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
        {/* <Button onClick={handleRandomCrypto} variant='success'> Random Crypto</Button>
        <div>
            <p> {cryptoIntraday?.close}</p>
        </div> */}
    </div>

);

};

export default StockCard