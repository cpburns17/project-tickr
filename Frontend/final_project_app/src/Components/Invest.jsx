import React, {useState} from "react"
import { useOutletContext, useNavigate } from "react-router-dom"

import Button from 'react-bootstrap/Button';

function Invest () {
    const {stock, quote, intraday, user} = useOutletContext() 
    const navigate = useNavigate();
    const [portfolioKey, setPortfolioKey] = useState(0);

    const [stockPrice, setStockPrice] = useState()
    const [bought, setBought] = useState(0)
    const [sold, setSold] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [time, setTime] = useState()
    // const [user, setUser] = useState(1)
    const [overdraft, setOverdraft] = useState(false)
    const [buySuccess, setBuySuccess] = useState(false)
    const [buyQuantity, setBuyQuantity] = useState(0); 


    const closeValue = parseFloat(intraday?.close);
    const currentPrice = closeValue.toFixed(2)
    const stockName = stock?.name
    const stockTick = stock?.symbol
    const userID = user?.id


    function handlePortfolioRedirect() {
        const key = Math.random();
        window.location.href = `/portfolio?key=${key}`;
    }



    function handleSubmit(e) {
        e.preventDefault();
        setStockPrice(currentPrice)
        const buyQuantity = parseFloat(quantity)
        if ((quantity * currentPrice) > user?.balance) {
            // Show an error message or handle the validation appropriately
            setOverdraft(true)
            console.error("Not enough funds");
            return;
        }
        setBought(currentPrice * quantity)


        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString('en-US', { timeZone: 'America/New_York' });


    const newStockPurchase = {
        name: stockName,
        ticker: stockTick,
        stock_price: currentPrice, 
        bought: currentPrice * buyQuantity,
        sold: sold,
        quantity: buyQuantity,
        time: formattedDate,
        user_id: userID,

    }

    fetch('api/trades', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(newStockPurchase)
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
        })
        .then((data) => {
        console.log("Post successful:", data);
        setBuySuccess(true);
        setQuantity(0);
        setBuyQuantity(buyQuantity); 


        })
        .catch((error) => console.error("Post error:", error));
    }


return (
    <div className="invest-container">
        <h2 className="invest-company-name"> {stock?.name}</h2>
        <h3> PPS: ${currentPrice} USD</h3>

        <p>Enter # of shares you'd like to buy:</p>
        <form className="invest-form" onSubmit={handleSubmit}>
            <input
                type="text"
                name="buy-stock"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="form-control"
            />
            <br></br>
                    <h1 className="invest-purchase-amount"> Total: ${(currentPrice * quantity).toFixed(2)}</h1>
            <br></br>
            <Button className="invest-button" type='submit'>
                Place Order
            </Button>
        {overdraft && (
            <div>
                <br></br>
                <p style={{color: 'red'}}> Error: Not Enough Funds</p>
            </div>
        )}



        </form>
        {buySuccess && (
            <div>
                <br></br>
                <h2>Congrats, you bought {buyQuantity} shares for ${(currentPrice * buyQuantity).toFixed(2)}!</h2>
                <br></br>
                <Button onClick={handlePortfolioRedirect}>
                    Go to Portfolio
                </Button>
            </div>
        )}
    </div>

);

}

export default Invest