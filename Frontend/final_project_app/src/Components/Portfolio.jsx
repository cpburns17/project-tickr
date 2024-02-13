import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { NavLink } from "react-router-dom";

//This is Bootstrap
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

//This is MUI
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import Buy from "./Buy";
// import Sell from "./Sell"

function Portfolio() {
    const { user, logo } = useOutletContext();
    const [transactions, setTransactions] = useState();
    const [selectedTicker, setSelectedTicker] = useState(null);

    const parseBalance = parseFloat(user?.balance);
    const myBalance = parseBalance.toLocaleString();

//THIS IS MODAL 

    // const [openBuy, setOpenBuy] = React.useState(false);
    // const handleOpenBuy = () => setOpenBuy(true);
    // const handleCloseBuy = () => setOpenBuy(false);

    // const [openSell, setOpenSell] = React.useState(false);
    // const handleOpenSell = () => setOpenSell(true);
    // const handleCloseSell = () => setOpenSell(false);


    // const style = {
    //     position: 'absolute',
    //     top: '50%',
    //     left: '50%',
    //     transform: 'translate(-50%, -50%)',
    //     width: 400,
    //     bgcolor: 'background.paper',
    //     border: '2px solid #000',
    //     boxShadow: 24,
    //     p: 4,
    // };


    useEffect(() => {
        if (user) {
            setTransactions(user.trades.slice().reverse());
        }
    }, [user]);

    // Object to keep track of aggregated quantities for each ticker
    const aggregatedQuantities = {};

    // Update aggregated quantities based on trade type
    transactions?.forEach((trade) => {
        const { ticker, bought, sold, quantity } = trade;

        if (bought > 0) {
            aggregatedQuantities[ticker] = (aggregatedQuantities[ticker] || 0) + quantity;
        } else if (sold > 0) {
            aggregatedQuantities[ticker] = (aggregatedQuantities[ticker] || 0) - quantity;
        }
    });


    const uniqueTradeObjects = Array.from(
        new Set(transactions?.map((trade) => trade.ticker))
    ).map((ticker) => {
        return transactions.find((trade) => trade.ticker === ticker);
    });


    const handleToggleTransactionHistory = (ticker) => {
        setSelectedTicker(ticker === selectedTicker ? null : ticker);
    };


    const portfolioMap = (uniqueTradeObjects || [])
    .filter((trade) => aggregatedQuantities[trade.ticker] !== 0)
    .map((trade, index) => {
        const aggregatedQuantity = aggregatedQuantities[trade.ticker] || 0;

        const totalInvestment =
            trade.bought > 0
                ? aggregatedQuantity * trade.stock_price // For bought transactions
            : trade.sold > 0
                ? aggregatedQuantity * trade.stock_price // For sold transactions
                : 0;
// MAP RETURN        
return (


    <Card className="card-item"> 
        {/* <Card.Img variant="top" src={logo?.logo} /> */}
        <Card.Body>
            <ListGroup> 
                <h2 className="portfolio-card-company-name">{trade.name}</h2>
                <Card.Text>Ticker: {trade.ticker}</Card.Text>
                <Card.Text>Shares Owned: {aggregatedQuantity}</Card.Text>
                <Card.Text>Total Investment: ${totalInvestment.toFixed(2)}</Card.Text>
            </ListGroup>
        </Card.Body>

        <Card.Body className="sell-buy-buttons"> 
{/* 
<Button onClick={handleOpenSell}>Sell</Button>
<Modal
open={openSell}
onClose={handleCloseSell}
aria-labelledby="modal-modal-title"
aria-describedby="modal-modal-description"
>
<Box sx={style}>
    <Sell trade={trade} aggregatedQuantity={aggregatedQuantity} />
</Box>
</Modal>

<Button onClick={handleOpenBuy}>Buy</Button>
<Modal
open={openBuy}
onClose={handleCloseBuy}
aria-labelledby="modal-modal-title"
aria-describedby="modal-modal-description"
>
<Box sx={style}>
    <Buy trade={trade} aggregatedQuantity={aggregatedQuantity} />
</Box>
</Modal> */}
                
            <NavLink
                to={{ pathname: "/sell" }}
                state={{ trade: trade, aggregatedQuantity: aggregatedQuantity }}
                className="sell-link"
            >
                Sell
            </NavLink>
            <NavLink
                to={{ pathname: "/buy" }}
                state={{ trade: trade, aggregatedQuantity: aggregatedQuantity }}
                className="buy-link"
            >
                Buy
            </NavLink>
    
        </Card.Body>
            <br></br>
            <Button onClick={() => handleToggleTransactionHistory(trade.ticker)}>
                {selectedTicker === trade.ticker ? 'Hide' : 'Show'} Transaction History
            </Button>
            <br />
                {selectedTicker === trade.ticker && (
                    <ListGroup className="each-transaction">
                        {transactions
                            .filter((transaction) => transaction.ticker === trade.ticker)
                            .map((transaction, index) => (
                        <ListGroup.Item key={index}>

                            {transaction.bought > 0 && (
                        <h4 style={{ color: "red", fontSize: '1rem', fontWeight: 'bold'  }}>Bought: {transaction.quantity} of {transaction.ticker} @ $
                                {(transaction.stock_price).toFixed(2)} = - ${(transaction.bought).toFixed(2)}
                        </h4> )}

                            {transaction.sold > 0 && (
                        <h4 style={{ color: "green", fontSize: '1rem', fontWeight: 'bold' }}>Sold: {transaction.quantity} of {transaction.ticker} @ $
                                {(transaction.stock_price).toFixed(2)} = + ${(transaction.sold).toFixed(2)}
                        </h4>)}

                        <Card.Footer>{transaction.time}</Card.Footer>
                        </ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                )}
    </Card>


);
});

// PORTFOLIO RETURN

    return (
        <div className="portfolio-container">
            <h1 className="portfolio-balance" >Balance: ${myBalance}</h1>
            <h2> {user?.name}'s Portfolio</h2>
            <br></br>
            <div className="card-container">
                <ul className='card-list'>{portfolioMap}</ul>
            </div>
            <h2>
                <NavLink to="/transactions" className="nav-transactions">
                    See All Transactions
                </NavLink>
            </h2>
        </div>
    );
}

export default Portfolio;



// return (
//     <div className="portfolio">
//         <h1 className="portfolio-balance" >Balance: ${myBalance}</h1>
//         <br></br>
//         {/* <h2>My Portfolio:</h2> */}
//         <ul>{portfolioMap}</ul>
//         <h2>
//             <NavLink to="/transactions" className="nav-transactions">
//                 See All Transactions
//             </NavLink>
//         </h2>
//     </div>
// );



//    <Card>
//         <CardHeader 
//         title= {trade?.name}
//         subheader= {trade.ticker}
//         />
//         <CardMedia
//         component="img"
//         height="194"
//         image="/static/images/cards/paella.jpg"
//         alt="Paella dish"
//         />
//         <CardContent>
//             <Typography variant="body2" color="text.secondary">
//                 Shares Owned: {aggregatedQuantity}
//                 Total Investment: ${totalInvestment.toFixed(2)}
//             </Typography>

//                 <NavLink
//                     to={{ pathname: "/sell" }}
//                     state={{ trade: trade, aggregatedQuantity: aggregatedQuantity }}
//                     className="nav-sell"
//                 >
//                     Sell
//                 </NavLink>
//                 <NavLink
//                     to={{ pathname: "/buy" }}
//                     state={{ trade: trade, aggregatedQuantity: aggregatedQuantity }}
//                     className="nav-buy"
//                 >
//                     Buy
//                 </NavLink>

//         </CardContent>
//         <CardActions disableSpacing>
//             <ExpandMore
//             expand={expanded}
//             onClick={handleExpandClick}
//             aria-expanded={expanded}
//             aria-label="show more"
//             >
//             <ExpandMoreIcon />
//             </ExpandMore>
//         </CardActions>
//         <Collapse in={expanded} timeout="auto" unmountOnExit>
//             <CardContent>

//             {selectedTicker === trade.ticker && (
//                     <ListGroup className="each-transaction">
//                         {transactions
//                             .filter((transaction) => transaction.ticker === trade.ticker)
//                             .map((transaction, index) => (
//                         <ListGroup.Item key={index}>

//                             {transaction.bought > 0 && (
//                         <h4 style={{ color: "red", fontSize: 'bold' }}>Bought: {transaction.quantity} of {transaction.ticker} @ $
//                                 {(transaction.stock_price).toFixed(2)} = - ${(transaction.bought).toFixed(2)}
//                         </h4> )}

//                             {transaction.sold > 0 && (
//                         <h4 style={{ color: "green", fontSize: 'bold'}}>Sold: {transaction.quantity} of {transaction.ticker} @ $
//                                 {(transaction.stock_price).toFixed(2)} = + ${(transaction.sold).toFixed(2)}
//                         </h4>)}

//                         <Card.Footer>{transaction.time}</Card.Footer>
//                         </ListGroup.Item>
//                             ))
//                         };
//                     </ListGroup>
//                 )}
//             </CardContent>
//         </Collapse>
// </Card>