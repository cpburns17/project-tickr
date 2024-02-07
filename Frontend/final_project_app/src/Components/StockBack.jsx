import React, {useState} from "react"
import { useOutletContext } from "react-router-dom"
import { NavLink } from "react-router-dom";
import Metrics from './Metrics'

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';



function StockBack ({flipCard}) {
    const {quote, stock,} = useOutletContext()

    const parseHigh = parseFloat(quote?.high);
    const parseLow = parseFloat(quote?.low);
    const parseOpen = parseFloat(quote?.open);
    const parseClose = parseFloat(quote?.previous_close);
    const parsePrice = parseFloat(quote?.price);



return (
<Card className="stock-back" data-bs-theme="dark">
    <Card.Body> 
        <h2> {stock?.name} </h2>
        {/* <p>Price: ${parsePrice.toFixed(2)}</p> */}
        <ListGroup >
        <ListGroup.Item>Open: ${parseOpen.toFixed(2)}</ListGroup.Item>
        <ListGroup.Item>Previous Close: ${parseClose.toFixed(2)}</ListGroup.Item>
        <ListGroup.Item>52 Week High: ${stock?.fiftytwo_high}</ListGroup.Item>
        <ListGroup.Item>52 Week Low: ${stock?.fiftytwo_low}</ListGroup.Item>
        <ListGroup.Item>P/E Ratio: ${stock?.pe_ratio}</ListGroup.Item>
        </ListGroup>
    </Card.Body>
    <Card.Body>
            <Card.Link href="metrics" className='nav-metrics'>
                See Metrics
            </Card.Link>
            <Card.Link href="news" className='nav-news'>
                Market News
            </Card.Link>
            <br></br>
            <br></br>
            <Button onClick={flipCard} className="flip-card-back"> Flip Card </Button>
    </Card.Body>

    

</Card>

);

}

export default StockBack


// <div>
// <h1> Stock Back</h1>
// {/* <p>Price: ${parsePrice.toFixed(2)}</p> */}
// <p>Open: ${parseOpen.toFixed(2)}</p>
// <p>Previous Close: ${parseClose.toFixed(2)}</p>
// <p>52 Week High: ${stock?.fiftytwo_high}</p>
// <p>52 Week Low: ${stock?.fiftytwo_low}</p>
// <p>P/E Ratio: ${stock?.pe_ratio}</p>
// {/* <p>High: ${parseHigh.toFixed(2)}</p>
// <p>Low: ${parseLow.toFixed(2)}</p> */}
// {/* <p>Volume: {quote?.volume}</p> */}

// <div>
//     <NavLink to="/metrics" className='nav-metrics'>
//         See Metrics
//     </NavLink>
// <br></br>
//     <NavLink to="/news" className='nav-news'>
//         Market News
//     </NavLink>
// </div>
// </div>