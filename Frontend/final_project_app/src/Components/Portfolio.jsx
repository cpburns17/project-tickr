import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Portfolio() {
    const { user } = useOutletContext();
    const [transactions, setTransactions] = useState();

    const parseBalance = parseFloat(user?.balance);
    const myBalance = parseBalance.toFixed(2);

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

    const portfolioMap = uniqueTradeObjects?.map((trade, index) => {
    const aggregatedQuantity = aggregatedQuantities[trade.ticker] || 0;

    return (
        <li key={index}>
        <p>Company: {trade.name}</p>
        <p>Ticker: {trade.ticker}</p>
        <p>Shares Owned: {aggregatedQuantity}</p>
        <NavLink
            to={{ pathname: "/sell" }}
            state={{ trade: trade, aggregatedQuantity : aggregatedQuantity }}
            className="nav-sell"
        >
            Sell
        </NavLink>
        <br></br>
        <NavLink
            to={{ pathname: "/buy" }}
            state={{ trade: trade, aggregatedQuantity : aggregatedQuantity }}
            className="nav-buy"
        >
            Buy
        </NavLink>
        </li>
    );
    });

    // const transactionMap = transactions?.map((trade, index) => (
    // <li key={index}>
    //     <p>{trade.name}</p>
    //     <p>Ticker: {trade.ticker}</p>
    //     <p>PPS: ${trade.stock_price}</p>
    //     <p
    //     style={{
    //         color: trade.bought > 0 ? "green" : trade.sold > 0 ? "red" : "black",
    //     }}
    //     >
    //     Shares: {trade.bought > 0 ? "+" : trade.sold > 0 ? "-" : ""}
    //     {trade.quantity}
    //     </p>
    //     {trade.bought > 0 && (
    //     <p style={{ color: "green" }}>Total Bought: ${trade.bought}</p>
    //     )}
    //     {trade.sold > 0 && <p style={{ color: "red" }}>Total Sold: ${trade.sold}</p>}
    // </li>
    // ));

    return (
    <div>
        <h1>Balance: ${myBalance}</h1>
        <h2> My Portfolio:</h2>
        <ul>{portfolioMap}</ul>
        <h2>
            <NavLink to="/transactions" className='nav-transactions'>
                See Transaction History
            </NavLink>
        </h2>
    </div>
    );
}

export default Portfolio;
