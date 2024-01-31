import React, {useState, useEffect} from "react"
import {useOutletContext} from "react-router-dom"
import { NavLink } from "react-router-dom";

function Portfolio () {
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
        <h2> My Portfolio:</h2>
        <ul>
        {transactions?.map((trade, index) => (
            <li key={index}>
            <p>Company: {trade.name}</p>
            <p>Ticker: {trade.ticker}</p>
            <p>Shares Owned: {trade.quantity}</p>
            <p>PPS: ${trade.stock_price}</p>
            <p>Total: ${trade.bought}</p>
            <NavLink
              to={{
                pathname: "/sell",
                state: { ticker: trade.ticker },
              }}
              className="nav-sell"
            >
                Sell
            </NavLink>
            </li>
        ))}
        </ul>


        
    </div>
    );



}

export default Portfolio