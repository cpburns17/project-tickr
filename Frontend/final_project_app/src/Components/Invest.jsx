import React, {useState} from "react"
import { useOutletContext } from "react-router-dom"

function Invest () {
    const {stock, quote, intraday} = useOutletContext() 

    const [stockPrice, setStockPrice] = useState()
    const [bought, setBought] = useState(0)
    const [sold, setSold] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [time, setTime] = useState()
    const [user, setUser] = useState(1)



    const closeValue = parseFloat(intraday?.close);
    const currentPrice = closeValue.toFixed(2)
    const stockName = stock?.name
    const stockTick = stock?.symbol
    




    function handleSubmit(e) {
        e.preventDefault();
        setStockPrice(currentPrice)
        // setUser(1)
        // setBought(currentPrice * quantity)
        // setQuantity(quantity)

        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString('en-US', { timeZone: 'America/New_York' });


    const newStockPurchase = {
        name: stockName,
        ticker: stockTick,
        stock_price: currentPrice, 
        bought: currentPrice * quantity,
        sold: sold,
        quantity: quantity,
        time: formattedDate,
        user_id: user,

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

        })
        .catch((error) => console.error("Post error:", error));

        setQuantity(0);

    }


    // console.log(user)
    // console.log(bought)
    // console.log(sold)
    // console.log(stockPrice)





return (

    <div>
        {stock?.name}
        <h1>${currentPrice}</h1>
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

        </form>
    </div>

);

}

export default Invest