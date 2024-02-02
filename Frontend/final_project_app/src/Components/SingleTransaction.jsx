import React, {useState, useEffect} from "react"
import { useOutletContext } from "react-router-dom"
import { NavLink } from "react-router-dom";


function SingleTransaction () {
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
        {/* <h3> {transactionMap}</h3> */}
    </div>
);

}

export default SingleTransaction