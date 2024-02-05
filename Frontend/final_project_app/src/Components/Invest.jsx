import React, {useState} from "react"
import { useOutletContext, useNavigate } from "react-router-dom"

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

    function handleGoBack() {
        navigate(-1);
    }


    function handleSubmit(e) {
        e.preventDefault();
        setStockPrice(currentPrice)
        const buyQuantity = parseFloat(quantity)
        // setUser(1)
        // setBought(currentPrice * quantity)
        // setQuantity(quantity)

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

    fetch('http://localhost:5555/trades', {
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

    <div>
        <h2> {stock?.name}</h2>
        <h3> PPS: ${currentPrice} USD</h3>
        <h1>${(currentPrice * quantity).toFixed(2)}</h1>
        <p>Enter # of shares you'd like to buy:</p>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="buy-stock"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="form-control"
            />
            <button type='submit'>
                Place Order
            </button>
            <br></br>
                <button  onClick={handleGoBack}> Go Back </button>


        </form>
        {buySuccess && (
            <div>
                <p>Congrats, you bought {buyQuantity} shares for ${(currentPrice * buyQuantity).toFixed(2)}!</p>
                <button onClick={handlePortfolioRedirect}>
                    Go to Portfolio
                </button>
            </div>
        )}
    </div>

);

}

export default Invest