import React, {useState, useEffect} from "react"
// import { useOutletContext } from "react-router-dom"
import { NavLink } from "react-router-dom";
import {useOutletContext} from "react-router-dom"
import Invest from './Invest'
import Portfolio from './Portfolio'

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';


function StockFront ({flipCard}) {
    const { stock, intraday} = useOutletContext();

    const closeValue = parseFloat(intraday?.close);



return (
<Card className="stock-front" data-bs-theme="dark">
    <Card.Body>
        <h2>
            {stock?.name}
        </h2>
        <Card.Subtitle>
            {stock?.symbol}
        </Card.Subtitle>
        <br></br>
        <ListGroup variant="flush">
        <h1>
            ${isNaN(closeValue) ? "N/A" : closeValue.toFixed(2)} USD
        </h1>
        <p> Exchange: {stock?.exchange}</p>
        <p> Industry: {stock?.industry}</p>
        </ListGroup>
        <Card.Text> Description: {stock?.description}</Card.Text>
    </Card.Body>
    <Card.Body> 
        <div>
            <NavLink to="/invest" className='nav-invest'>
                Click here to invest
            </NavLink>
        </div>
        <br></br>
        <Button onClick={flipCard} className="flip-card-front"> Flip Card </Button>
    </Card.Body>

</Card>
);

}

export default StockFront


// return (
//     <div>
//         <h1>
//             {stock?.name}
//         </h1>
//         <h2>
//             {stock?.symbol}
//         </h2>
//         <h2>
//             ${isNaN(closeValue) ? "N/A" : closeValue.toFixed(2)} USD
//         </h2>
//         <p> Exchange: {stock?.exchange}</p>
//         <p> Industry: {stock?.industry}</p>
//         <p> Description: {stock?.description}</p>
        
        
        
//         <div>
//             <NavLink to="/invest" className='nav-invest'>
//                 Click here to invest
//             </NavLink>
//         </div>
//     </div>
// )