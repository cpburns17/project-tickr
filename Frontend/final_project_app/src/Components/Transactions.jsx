import {useState, useEffect} from "react"
import { useOutletContext, useNavigate } from "react-router-dom"
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Button from 'react-bootstrap/Button';


function Transactions () {

    const {user} = useOutletContext()
    const [transactions, setTransactions] = useState()
    const navigate = useNavigate();

    const parseBalance = parseFloat(user?.balance)
    const myBalance = parseBalance.toFixed(2)

useEffect(() => {
    if (user) {
        setTransactions(user.trades.slice().reverse());
    }
    }, [user]);

    function handleGoBack() {
        navigate(-1);
    }


// const transactionMap = transactions?.map((trade, index) => (
// <Card className="transactions-card"> 
//     <ListGroup key={index}>
//         <Card.Header>{trade.name}</Card.Header>
//         <p>Ticker: {trade.ticker}</p>
//         <p>PPS: ${trade.stock_price}</p>

//         {trade.bought > 0 && 
//         <ListGroup.Item style={{ color: "red" }}>Bought: -${(trade.bought).toFixed(2)}</ListGroup.Item>}

//         {trade.sold > 0 && 
//         <ListGroup.Item style={{ color: "green" }}>Sold: +${(trade.sold).toFixed(2)}</ListGroup.Item>}

//         <ListGroup.Item>{trade.quantity} of {trade.ticker} @ ${trade.stock_price}</ListGroup.Item>

//         <Card.Footer>{trade.time}</Card.Footer>
//     </ListGroup>
//     </Card>
//     ));



return (
    <div className="transactions" >
        <h2>Transaction History:</h2>
        <br></br>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: '', maxHeight: '500vh' }} aria-label="simple table">
    <TableHead>
            <TableRow>
            <TableCell>Company</TableCell>
            <TableCell align="right">Ticker</TableCell>
            <TableCell align="right">Shares</TableCell>
            <TableCell align="right">PPS (at time)</TableCell>
            <TableCell align="center">Total</TableCell>
            <TableCell align="center">Timestamp</TableCell>
            </TableRow>
    </TableHead>
    <TableBody>
            {transactions?.map((trade, index) => ( 
        <TableRow key={index}>
        <TableCell component="th" scope="trade">
            {trade.name}
        </TableCell>
        <TableCell align="right">{trade.ticker}</TableCell>
        <TableCell align="right">{trade.quantity}</TableCell>
        <TableCell align="right">${trade.stock_price}</TableCell>
        {trade.bought > 0 && 
        <TableCell align="right" style={{ color: "red" }}>Bought: -${(trade.bought).toFixed(2)}</TableCell>}

        {trade.sold > 0 && 
        <TableCell align="right" style={{ color: "green" }}>Sold: +${(trade.sold).toFixed(2)}</TableCell>}
        <TableCell align="right">{trade.time}</TableCell>
        </TableRow>
        ))}   
    </TableBody>
    </Table>
    </TableContainer>
    <br></br>
    <Button onClick={handleGoBack} > Go Back </Button>
    </div>


);

}

export default Transactions

{/* <div className="transactions" >
<h2>Transaction History:</h2>
<br></br>
<h3>{transaction}</h3>
</div> */}