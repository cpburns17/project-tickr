import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { NavLink } from "react-router-dom";

// Bootstrap
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

function Portfolio() {
    const { user } = useOutletContext();
    const [transactions, setTransactions] = useState();
    const [selectedTicker, setSelectedTicker] = useState(null);
    const [netGainLoss, setNetGainLoss] = useState(0); // Stores net gain/loss
    const [stockPrices, setStockPrices] = useState({}); // Stores stock prices for each ticker

    // converts to parse and 2 decimals
    const parseBalance = parseFloat(user?.balance);
    const myBalance = parseBalance.toLocaleString();

    // reverses transaction history to show most recent top
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
        if (ticker === selectedTicker) {
            setNetGainLoss(0);
        } else {
            handleFetchStockPrice(ticker);
        }
    };

    // fetches current pps of stock to compare to purchased price
    const handleFetchStockPrice = (ticker) => {
        fetch(`api/intraday/${ticker}`)
            .then(r => r.json())
            .then(data => {
                setStockPrices({ ...stockPrices, [ticker]: data?.close });
                const currentPrice = data?.close || 0;
                const boughtPrice = transactions.find(trade => trade.ticker === ticker && trade.bought > 0)?.bought || 0;
                const aggregatedQuantity = aggregatedQuantities[ticker] || 0;
                const gainLoss = (currentPrice - boughtPrice) / boughtPrice * aggregatedQuantity;
                setNetGainLoss(gainLoss.toFixed(2));
            })
            .catch((error) => {
                console.error('Error fetching intraday data:', error);
            });
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

        return (
            <Card className="card-item" key={index}>
                <Card.Body>
                    <ListGroup>
                        <h2 className="portfolio-card-company-name">{trade.name}</h2>
                        <Card.Text>Ticker: {trade.ticker}</Card.Text>
                        <Card.Text>Shares Owned: {aggregatedQuantity}</Card.Text>
                        <Card.Text>Total Investment: ${totalInvestment.toFixed(2)}</Card.Text>
                            {selectedTicker === trade.ticker && (
                                <Card.Text style={{fontWeight: 'bolder'}}>Net Gain/Loss: ${netGainLoss}</Card.Text>
                            )}
                    </ListGroup>
                </Card.Body>

                <Card.Body className="sell-buy-buttons">
                    <NavLink
                        to={{ pathname: "/sell" }}
                        state={{ trade: trade, aggregatedQuantity: aggregatedQuantity }}
                        className="sell-link">
                        Sell
                    </NavLink>
                    <NavLink
                        to={{ pathname: "/buy" }}
                        state={{ trade: trade, aggregatedQuantity: aggregatedQuantity }}
                        className="buy-link">
                        Buy
                    </NavLink>
                </Card.Body>
                <br />
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
                                        <h4 style={{ color: "red", fontSize: '1rem', fontWeight: 'bold' }}>Bought: {transaction.quantity} of {transaction.ticker} @ ${(transaction.stock_price).toFixed(2)} = - ${(transaction.bought).toFixed(2)}</h4>
                                    )}
                                    {transaction.sold > 0 && (
                                        <h4 style={{ color: "green", fontSize: '1rem', fontWeight: 'bold' }}>Sold: {transaction.quantity} of {transaction.ticker} @ ${(transaction.stock_price).toFixed(2)} = + ${(transaction.sold).toFixed(2)}</h4>
                                    )}
                                    <Card.Footer>{transaction.time}</Card.Footer>
                                </ListGroup.Item>
                            ))}
                    </ListGroup>
                )};
            </Card>
        );
    });

return (
    <div className="portfolio-container">
        <h1 className="portfolio-balance" >Balance: ${myBalance}</h1>
        <h2> {user?.name}'s Portfolio</h2>
        <br />
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

};

export default Portfolio;
