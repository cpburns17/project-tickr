import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Portfolio() {
    const { user } = useOutletContext();
    const [transactions, setTransactions] = useState();
    const [selectedTicker, setSelectedTicker] = useState(null);

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

    const handleToggleTransactionHistory = (ticker) => {
        setSelectedTicker(ticker === selectedTicker ? null : ticker);
    };

    const portfolioMap = uniqueTradeObjects?.map((trade, index) => {
        const aggregatedQuantity = aggregatedQuantities[trade.ticker] || 0;

        const totalInvestment =
            trade.bought > 0
                ? aggregatedQuantity * trade.stock_price // For bought transactions
                : trade.sold > 0
                ? aggregatedQuantity * trade.sold // For sold transactions
                : 0;

        return (
            <li key={index}>
                <h2>{trade.name}</h2>
                <p>Ticker: {trade.ticker}</p>
                <p>Shares Owned: {aggregatedQuantity}</p>
                <p>Total Investment: ${totalInvestment.toFixed(2)}</p>

                <button onClick={() => handleToggleTransactionHistory(trade.ticker)}>
                    {selectedTicker === trade.ticker ? 'Hide' : 'Show'} Transaction History
                </button>

                {selectedTicker === trade.ticker && (
                    <ul>
                        {transactions
                            .filter((transaction) => transaction.ticker === trade.ticker)
                            .map((transaction, index) => (
                                <li key={index}>
                                    {/* Render transaction details here */}
                                    <p>{transaction.name}</p>
                                    {transaction.bought > 0 && (
                                        <p style={{ color: "red" }}>Bought: -${transaction.bought}</p>
                                    )}
                                    {transaction.sold > 0 && (
                                        <p style={{ color: "green" }}>Sold: +${transaction.sold}</p>
                                    )}
                                    <p>
                                        {transaction.quantity} of {transaction.ticker} @ $
                                        {transaction.stock_price}
                                    </p>
                                    <p>{transaction.time}</p>
                                </li>
                            ))}
                    </ul>
                )}

                <NavLink
                    to={{ pathname: "/sell" }}
                    state={{ trade: trade, aggregatedQuantity: aggregatedQuantity }}
                    className="nav-sell"
                >
                    Sell
                </NavLink>
                <br />
                <NavLink
                    to={{ pathname: "/buy" }}
                    state={{ trade: trade, aggregatedQuantity: aggregatedQuantity }}
                    className="nav-buy"
                >
                    Buy
                </NavLink>
                
            </li>
        );
    });

    return (
        <div>
            <h1>Balance: ${myBalance}</h1>
            <h2>{user.name}'s Portfolio:</h2>
            <ul>{portfolioMap}</ul>
            <h2>
                <NavLink to="/transactions" className="nav-transactions">
                    See Transaction History
                </NavLink>
            </h2>
        </div>
    );
}

export default Portfolio;





// import React, { useState, useEffect } from "react";
// import { useOutletContext } from "react-router-dom";
// import { NavLink } from "react-router-dom";

// function Portfolio() {
//     const { user } = useOutletContext();
//     const [transactions, setTransactions] = useState();
//     const [selectedTicker, setSelectedTicker] = useState(null);


//     const parseBalance = parseFloat(user?.balance);
//     const myBalance = parseBalance.toFixed(2);

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

//     const portfolioMap = uniqueTradeObjects?.map((trade, index) => {
//         const aggregatedQuantity = aggregatedQuantities[trade.ticker] || 0;

//         // Calculate total investment
//         const totalInvestment = trade.bought > 0
//             ? aggregatedQuantity * trade.stock_price // For bought transactions
//             : trade.sold > 0
//             ? aggregatedQuantity * trade.sold // For sold transactions
//             : 0;

//         return (
//             <li key={index}>
//                 <h2>{trade.name}</h2>
//                 <p>Ticker: {trade.ticker}</p>
//                 <p>Shares Owned: {aggregatedQuantity}</p>
//                 <p>Total Investment: ${totalInvestment.toFixed(2)}</p> {/* Change made here */}
//                 <NavLink
//                     to={{ pathname: "/sell" }}
//                     state={{ trade: trade, aggregatedQuantity: aggregatedQuantity }}
//                     className="nav-sell"
//                 >
//                     Sell
//                 </NavLink>
//                 <br></br>
//                 <NavLink
//                     to={{ pathname: "/buy" }}
//                     state={{ trade: trade, aggregatedQuantity: aggregatedQuantity }}
//                     className="nav-buy"
//                 >
//                     Buy
//                 </NavLink>
//             </li>
//         );
//     });

//     return (
//         <div>
//             <h1>Balance: ${myBalance}</h1>
//             <h2> {user.name}'s Portfolio:</h2>
//             <ul>{portfolioMap}</ul>
//             <h2>
//                 <NavLink to="/transactions" className='nav-transactions'>
//                     See Transaction History
//                 </NavLink>
//             </h2>
//         </div>
//     );
// }

// export default Portfolio;
