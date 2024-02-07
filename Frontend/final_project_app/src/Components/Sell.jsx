import React, {useState, useEffect} from "react"
import { useOutletContext, useLocation, useNavigate } from "react-router-dom"


function Sell ({aggregatedQuantity, trade}) {
    const {stock, quote, intraday, user} = useOutletContext() 

    const navigate = useNavigate()
    // const location = useLocation();
    // const trade = location.state && location.state.trade;
    // const aggregatedQuantity = location.state;
    const [sellSuccess, setSellSuccess] = useState(false);
    const [sellQuantity, setSellQuantity] = useState(0); 
    
  
    const [stockPrice, setStockPrice] = useState()
    const [bought, setBought] = useState(0)
    const [sold, setSold] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [time, setTime] = useState()

    const closeValue = parseFloat(stockPrice);
    const currentPrice = closeValue.toFixed(2)

    const stockName = trade?.name
    const stockTick = trade?.ticker
    const currentQuantity = aggregatedQuantity.aggregatedQuantity
    const userID = user?.id


    const [currentStockData, setCurrentStockData] = useState()
    const [ticker, setTicker] = useState("DefaultTicker");


    function handleGoBack() {
        navigate(-1);
    }


    useEffect(() => {
    fetch(`api/intraday/${stockTick}`)
    .then(r => r.json())
    .then (data => {
        // console.log(data)
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
        if (sellQuantity <= 0 || sellQuantity > currentQuantity) {
            // Show an error message or handle the validation appropriately
            console.error("Invalid quantity entered");
            return;
        }

        setStockPrice(currentPrice)

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


    }


return (

<div>
    <h2>Company: {trade.name}</h2>
        {/* <p>Ticker: {trade.ticker}</p> */}
        <p>Shares Owned: {currentQuantity}</p>
        {/* <p>PPS: ${trade.stock_price}</p>
        <p>Total: ${trade.bought}</p> */}
        <div>
            <h3>Current Stock PPS: ${currentPrice}</h3>
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
                <button type='submit'>
                    Execute
                </button>
                <br></br>
                <button  onClick={handleGoBack}> Go Back </button>
            </form>

        {sellSuccess && (
        <p>Congrats, you sold {sellQuantity} shares for ${(currentPrice * sellQuantity).toFixed(2)}!</p>
        )}
        </div>

</div>

);

};

export default Sell