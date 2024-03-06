import React, {useState, useEffect} from "react"
import { useOutletContext, useLocation, useNavigate} from "react-router-dom"

import Button from 'react-bootstrap/Button';


function Buy (){
    const {user} = useOutletContext() 

    const [buySuccess, setBuySuccess] = useState(false); 
    const [buyQuantity, setBuyQuantity] = useState(0); 
    const [stockPrice, setStockPrice] = useState()
    const [quantity, setQuantity] = useState(0)
    const [overdraft, setOverdraft] = useState(false)
    const [currentStockData, setCurrentStockData] = useState()

// location used to access trade data passed as state from portfolio
    const location = useLocation(); 
    const trade = location.state && location.state.trade; 
    const aggregatedQuantity = location.state;

// assigns current price to current PPS 
    const closeValue = parseFloat(stockPrice);
    const currentPrice = closeValue.toFixed(2)

    const stockName = trade?.name
    const stockTick = trade?.ticker
    const currentQuantity = aggregatedQuantity.aggregatedQuantity
    const userID = user?.id

    const navigate = useNavigate() 

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
        const buyQuantity = parseFloat(quantity);

        if ((quantity * currentPrice) > user?.balance) {
            console.error("Not enough funds");
            setOverdraft(true)
            return;
        }
        setStockPrice(currentPrice)

        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString('en-US', { timeZone: 'America/New_York' });

        const newStockBought = {
            name: stockName,
            ticker: stockTick,
            stock_price: currentPrice, 
            bought: currentPrice * buyQuantity,
            sold: 0,
            quantity: buyQuantity,
            time: formattedDate,
            user_id: userID,
        }


        fetch('api/trades', {
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
            .catch((error) => console.error("Post error:", error))

    };


return (
<div className="buy-container">
    <h2>Company: {trade.name}</h2>
    <h3>Shares Owned: {currentQuantity}</h3>
    <div>
        <h2 >Current Stock PPS: ${currentPrice}</h2>
        <h1 >${(currentPrice * quantity).toFixed(2)}</h1>
        <p>Enter # of shared you'd like to buy:</p>
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
                Place order
            </Button>
            <br></br>
            {overdraft && (
            <div>
                <br></br>
                <p style={{color: 'red'}}> Error: Not Enough Funds</p>
            </div>
            )}
        </form>
        <br></br>
        <button  onClick={handleGoBack}> Go Back </button>

    {buySuccess && (
    <p>Congrats, you bought {buyQuantity} shares for ${(currentPrice * buyQuantity).toFixed(2)}!</p>
    )}
    </div>
</div>

);

};

export default Buy