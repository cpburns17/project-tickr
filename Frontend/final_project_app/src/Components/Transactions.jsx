import React, {useState, useEffect} from "react"
import { useOutletContext } from "react-router-dom"

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
    <li key={index}>
        <p>{trade.name}</p>
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
        {trade.bought > 0 && (
        <p style={{ color: "red" }}>Bought: -${trade.bought}</p>
        )}
        {trade.sold > 0 && <p style={{ color: "green" }}>Sold: +${trade.sold}</p>}
        <p>{trade.quantity} of {trade.ticker} @ ${trade.stock_price}</p>
    </li>
    ));


return (
    <div>
        <h1>Balance: ${myBalance}</h1>
        
        <h2>Transaction History:</h2>
        <h3> {transactionMap}</h3>
    </div>
);

}

export default Transactions