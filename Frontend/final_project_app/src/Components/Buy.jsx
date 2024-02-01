import React, {useState, useEffect} from "react"
import { useOutletContext, useLocation } from "react-router-dom"


function Buy (){
    const {stock, quote, intraday, user} = useOutletContext() 

    const location = useLocation();
    const trade = location.state && location.state.trade;
    const aggregatedQuantity = location.state;
    const [buySuccess, setBuySuccess] = useState(false); // New state variable
    const [buyQuantity, setBuyQuantity] = useState(0); // New state variable
    


  
    const [stockPrice, setStockPrice] = useState()
    const [bought, setBought] = useState(0)
    const [sold, setSold] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [time, setTime] = useState()

    const closeValue = parseFloat(stockPrice);
    const currentPrice = closeValue.toFixed(2)
    console.log(currentPrice)
    const stockName = trade?.name
    const stockTick = trade?.ticker
    const currentQuantity = aggregatedQuantity.aggregatedQuantity
    const userID = user?.id


    const [currentStockData, setCurrentStockData] = useState()
    const [ticker, setTicker] = useState("DefaultTicker");



    useEffect(() => {
    fetch(`http://localhost:5555/intraday/${stockTick}`)
    .then(r => r.json())
    .then (data => {
        console.log(data)
        setCurrentStockData(data)
        setStockPrice(data?.close)
        console.log(data?.close)
    })
    .catch((error) => {
        console.error('Error fetching intraday data:', error);
    });
    }, [location]);



    function handleSubmit(e) {
        e.preventDefault();
        const buyQuantity = parseFloat(quantity);
        // if (buyQuantity <= 0 || buyQuantity > currentQuantity) {
        //     // Show an error message or handle the validation appropriately
        //     console.error("Invalid quantity entered");
        //     return;
        // }

        setStockPrice(currentPrice)

        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString('en-US', { timeZone: 'America/New_York' });


    const newStockBought = {
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
        body: JSON.stringify(newStockBought)
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
    <h2>Buy Component</h2>
        <p>Company: {trade.name}</p>
        <p>Ticker: {trade.ticker}</p>
        <p>Shares Owned: {currentQuantity}</p>
        {/* <p>PPS: ${trade.stock_price}</p>
        <p>Total: ${trade.bought}</p> */}
        <div>
            <h3>Current Stock Price: ${currentPrice}</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="sell-stock"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="form-control"
                />
                <button type='submit'>
                    Place order
                </button>
            </form>

        {buySuccess && (
        <p>Congrats, you bought {buyQuantity} shares for ${(currentPrice * buyQuantity).toFixed(2)}!</p>
        )}
        </div>

</div>

);


};

export default Buy