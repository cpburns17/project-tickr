import React, {useState, useEffect} from "react"
import { useOutletContext } from "react-router-dom"


import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function Transactions () {

    const {user} = useOutletContext()
    const [transactions, setTransactions] = useState()

    const parseBalance = parseFloat(user?.balance)
    const myBalance = parseBalance.toFixed(2)

useEffect(() => {
    if (user) {
        setTransactions(user.trades.slice().reverse());
    }
    }, [user]);


const transactionMap = transactions?.map((trade, index) => (
<Card className="transactions-card"> 
    <ListGroup key={index}>
        <Card.Header>{trade.name}</Card.Header>
        {/* <p>Ticker: {trade.ticker}</p>
        <p>PPS: ${trade.stock_price}</p> */}
        {/* <p
        style={{
            color: trade.bought > 0 ? "green" : trade.sold > 0 ? "red" : "black",
        }}
        >
        Shares: {trade.bought > 0 ? "+" : trade.sold > 0 ? "-" : ""}
        {trade.quantity}
        </p> */}

        {trade.bought > 0 && 
        <ListGroup.Item style={{ color: "red" }}>Bought: -${(trade.bought).toFixed(2)}</ListGroup.Item>}

        {trade.sold > 0 && 
        <ListGroup.Item style={{ color: "green" }}>Sold: +${(trade.sold).toFixed(2)}</ListGroup.Item>}

        <ListGroup.Item>{trade.quantity} of {trade.ticker} @ ${trade.stock_price}</ListGroup.Item>

        <Card.Footer>{trade.time}</Card.Footer>
    </ListGroup>
    </Card>
    ));


return (
    <div className="transactions" >
        {/* <h1>Balance: ${myBalance}</h1> */}
        <h2>Transaction History:</h2>
        <br></br>
        <h3> {transactionMap}</h3>
    </div>
);

}

export default Transactions