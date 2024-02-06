import React, {useState, useEffect} from "react"
import { useOutletContext, useLocation } from "react-router-dom"
// import App from '../App.jsx'
import StockFront from './StockFront'
import StockBack from './StockBack'


import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

function StockCard () {
    const [frontCard, setFrontCard] = useState(true)
    const { stock, setStock, handleRandomStock } = useOutletContext();
    const location = useLocation() 


    function flipCard() {
        setFrontCard(!frontCard)
    }


return (
    <div className="stock-card-container">
    {/* <Card className="stock-card"> */}
        <div>
            {frontCard ? 
            <StockFront flipCard={flipCard}/> 
            : 
            <StockBack flipCard={flipCard}/>
            }
        </div>
        <br></br>
    {/* </Card> */}
        <Button onClick={handleRandomStock} variant="success"> Random Stock</Button>
    </div>

);

}

export default StockCard