import React, {useState, useEffect} from "react"
import { useOutletContext, useLocation, useNavigate } from "react-router-dom"

import Button from 'react-bootstrap/Button';

function Sell () {
    const {stock, quote, intraday, user} = useOutletContext() 

    const navigate = useNavigate() //This is used to go back (button)
    const location = useLocation();
    const trade = location.state && location.state.trade;
    const aggregatedQuantity = location.state;

    // console.log(trade)
    const [currentStockData, setCurrentStockData] = useState()
    const [ticker, setTicker] = useState("DefaultTicker");
    const [sellSuccess, setSellSuccess] = useState(false);
    const [sellQuantity, setSellQuantity] = useState(0); 
    const [stockPrice, setStockPrice] = useState()
    const [bought, setBought] = useState(0)
    const [sold, setSold] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [time, setTime] = useState()

    // converts float and 2 decimals
    const closeValue = parseFloat(stockPrice);
    const currentPrice = closeValue.toFixed(2)

    // renames props
    const stockName = trade?.name
    const stockTick = trade?.ticker
    const currentQuantity = aggregatedQuantity.aggregatedQuantity
    const userID = user?.id


    function handleGoBack() {
        navigate(-1);
    }

    useEffect(() => {
    fetch(`api/intraday/${stockTick}`)
    .then(r => r.json())
    .then (data => {
        console.log(data)
        setCurrentStockData(data)
        setStockPrice(data?.close)
    })
    .catch((error) => {
        console.error('Error fetching intraday data:', error);
    });
    }, [location]);


    function handleSubmit(e) {
        e.preventDefault();
        const sellQuantity = parseFloat(quantity);
        // error if user tries to sell more than owned
        if (sellQuantity <= 0 || sellQuantity > currentQuantity) {
            console.error("Invalid quantity entered");
            return;
        }
        setStockPrice(currentPrice)

        // time stamped
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString('en-US', { timeZone: 'America/New_York' });

        const newStockSold = {
            name: stockName,
            ticker: stockTick,
            stock_price: currentPrice, 
            bought: bought,
            sold: currentPrice * sellQuantity,
            quantity: sellQuantity,
            time: formattedDate,
            user_id: userID,
        }


        fetch('api/trades', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newStockSold)
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
            })
            .then((data) => {
            console.log("Post successful:", data);
            setSellSuccess(true);
            setQuantity(0);
            setSellQuantity(sellQuantity);
            })
            .catch((error) => console.error("Post error:", error));

    };

return (
    <div className="sell-container">
        <h2>Company: {trade.name}</h2>
        {/* <p>Ticker: {trade.ticker}</p> */}
        <h3>Shares Owned: {currentQuantity}</h3>
        {/* <p>PPS: ${trade.stock_price}</p>
        <p>Total: ${trade.bought}</p> */}
        <div className="sell-card"> 
            <h4>Current Stock PPS: ${currentPrice}</h4>
            <h1>${(currentPrice * quantity).toFixed(2)}</h1>
            <p>Enter # of shared you'd like to sell (max {currentQuantity}):</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="sell-stock"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="form-control"
                />
            <br></br>
                <Button type='submit'>
                    Execute
                </Button>
            </form>
            <br></br>
            <button  onClick={handleGoBack}> Go Back </button>

        {sellSuccess && (
        <p>Congrats, you sold {sellQuantity} shares for ${(currentPrice * sellQuantity).toFixed(2)}!</p>
        )}
        
        </div>
    </div>

);

};

export default Sell