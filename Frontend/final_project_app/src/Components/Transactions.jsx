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


return (
    <div>
        <h1>Balance: ${myBalance}</h1>
        
        <h2>Transaction History:</h2>
        <ul>
        {transactions?.map((trade, index) => (
            <li key={index}>
            <h1>- ${trade.bought}</h1>
            <p>Company: {trade.name}</p>
            <p>Ticker: {trade.ticker}</p>
            <p># of shares: {trade.quantity}</p>
            <p>PPS: ${trade.stock_price}</p>
            <p>{trade.time}</p>
            </li>
        ))}
        </ul>
    </div>
);

}

export default Transactions