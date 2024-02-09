// import React, { useState, useEffect } from "react";
// import { useOutletContext } from "react-router-dom";
// import { NavLink } from "react-router-dom";


// import { styled } from '@mui/material/styles';
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import CardActions from '@mui/material/CardActions';
// import Collapse from '@mui/material/Collapse';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

// function Portfolio() {
//     const { user } = useOutletContext();
//     const [transactions, setTransactions] = useState();
//     const [selectedTicker, setSelectedTicker] = useState(null);

//     const parseBalance = parseFloat(user?.balance);
//     const myBalance = parseBalance.toFixed(2);


//     const [expanded, setExpanded] = React.useState(false);

//     const handleExpandClick = () => {
//       setExpanded(!expanded);
//     };

//     const ExpandMore = styled((props) => {
//         const { expand, ...other } = props;
//         return <IconButton {...other} />;
//       })(({ theme, expand }) => ({
//         transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//         marginLeft: 'auto',
//         transition: theme.transitions.create('transform', {
//           duration: theme.transitions.duration.shortest,
//         }),
//       }));



//     useEffect(() => {
//         if (user) {
//             setTransactions(user.trades.slice().reverse());
//         }
//     }, [user]);

//     // Object to keep track of aggregated quantities for each ticker
//     const aggregatedQuantities = {};

//     // Update aggregated quantities based on trade type
//     transactions?.forEach((trade) => {
//         const { ticker, bought, sold, quantity } = trade;

//         if (bought > 0) {
//             aggregatedQuantities[ticker] = (aggregatedQuantities[ticker] || 0) + quantity;
//         } else if (sold > 0) {
//             aggregatedQuantities[ticker] = (aggregatedQuantities[ticker] || 0) - quantity;
//         }
//     });


//     const uniqueTradeObjects = Array.from(
//         new Set(transactions?.map((trade) => trade.ticker))
//     ).map((ticker) => {
//         return transactions.find((trade) => trade.ticker === ticker);
//     });


//     const handleToggleTransactionHistory = (ticker) => {
//         setSelectedTicker(ticker === selectedTicker ? null : ticker);
//     };


//     const portfolioMap = (uniqueTradeObjects || [])
//     .filter((trade) => aggregatedQuantities[trade.ticker] !== 0)
//     .map((trade, index) => {
//         const aggregatedQuantity = aggregatedQuantities[trade.ticker] || 0;

//         const totalInvestment =
//             trade.bought > 0
//                 ? aggregatedQuantity * trade.stock_price // For bought transactions
//             : trade.sold > 0
//                 ? aggregatedQuantity * trade.stock_price // For sold transactions
//                 : 0;
// // MAP RETURN        
// return (
//     <Card> 
//     <Card>
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



//         <Card.Body>
//             <ListGroup> 
//                 <h2>{trade.name}</h2>
//                 <Card.Text>Ticker: {trade.ticker}</Card.Text>
//                 <Card.Text>Shares Owned: {aggregatedQuantity}</Card.Text>
//                 <Card.Text>Total Investment: ${totalInvestment.toFixed(2)}</Card.Text>
//             </ListGroup>
//         </Card.Body>

                


//         <Card.Body> 

                
    
//         </Card.Body>
//             <br></br>
//             <Button onClick={() => handleToggleTransactionHistory(trade.ticker)}>
//                 {selectedTicker === trade.ticker ? 'Hide' : 'Show'} Transaction History
//             </Button>
//             <br />
   
//     </Card>

// );
// });

// // PORTFOLIO RETURN

//     return (
//         <div className="portfolio">
//             <h1 className="portfolio-balance" >Balance: ${myBalance}</h1>
//             <h2> {user?.name}'s Portfolio</h2>
//             <br></br>
//             {/* <h2>My Portfolio:</h2> */}
//             <ul>{portfolioMap}</ul>
//             <h2>
//                 <NavLink to="/transactions" className="nav-transactions">
//                     See All Transactions
//                 </NavLink>
//             </h2>
//         </div>
//     );
// }

// export default Portfolio;



