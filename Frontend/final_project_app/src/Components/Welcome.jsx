import React, {useState, useEffect} from "react"
// import { useOutletContext } from "react-router-dom"

function Welcome () {


return (

    <div>
        Welcome Page
    </div>

)

}

export default Welcome


// import React, {useState, useEffect} from "react"
// import { useOutletContext, useLocation } from "react-router-dom"


// function Sell () {
//     const {stock, quote, intraday, user} = useOutletContext() 
//     const location = useLocation();

//     const [sellingStock, setSellingStock] = useState()
//     const [tickerFromProps, setTickerFromProps] = useState("DefaultTicker");


//     // const [stockPrice, setStockPrice] = useState()
//     // const [bought, setBought] = useState(0)
//     // const [sold, setSold] = useState(0)
//     // const [quantity, setQuantity] = useState(0)
//     // const [time, setTime] = useState()

//     // const closeValue = parseFloat(intraday?.close);
//     // const currentPrice = closeValue.toFixed(2)
//     // const stockName = stock?.name
//     // const stockTick = stock?.symbol
//     // const userID = user?.id

//     useEffect(() => {

//         const ticker = location.state?.ticker;
//         if (ticker) {
//           setTickerFromProps(ticker);
//           console.log("Ticker from props:", ticker);
//         }
//       }, [location]);

//     console.log(tickerFromProps)

//     useEffect(() => {
//     fetch(`http://localhost:5555/intraday/${tickerFromProps}`)
//     .then(r => r.json())
//     .then (data => {
//         console.log(data)
//         setSellingStock(data)
//     })
//     .catch((error) => {
//         console.error('Error fetching intraday data:', error);
//     });
//     }, [location]);


//     // function handleSubmit(e) {
//     //     e.preventDefault();
//     //     setStockPrice(currentPrice)

//     //     const currentDate = new Date();
//     //     const formattedDate = currentDate.toLocaleString('en-US', { timeZone: 'America/New_York' });


//     // const newStockSold = {
//     //     name: stockName,
//     //     ticker: stockTick,
//     //     stock_price: currentPrice, 
//     //     bought: bought,
//     //     sold: currentPrice * quantity,
//     //     quantity: quantity,
//     //     time: formattedDate,
//     //     user_id: userID,

//     // }


//     // fetch('http://localhost:5555/trades', {
//     //     method: "POST",
//     //     headers: {
//     //         "Content-type": "application/json"
//     //     },
//     //     body: JSON.stringify(newStockSold)
//     // })
//     // .then((response) => {
//     //     if (!response.ok) {
//     //         throw new Error(`HTTP error! status: ${response.status}`);
//     //     }
//     //     return response.json();
//     //     })
//     //     .then((data) => {
//     //     console.log("Post successful:", data);

//     //     })
//     //     .catch((error) => console.error("Post error:", error));

//     //     setQuantity(0);

//     // }

// return (

//     <div>
//         {stock?.name}
//         <h1>${currentPrice}</h1>
//         <form onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 name="sell-stock"
//                 placeholder="Quantity"
//                 value={quantity}
//                 onChange={(e) => setQuantity(e.target.value)}
//                 className="form-control"
//             />
//             <button type='submit'>
//                 Liquidate
//             </button>

//         </form>

//     </div>

// );

// };

// export default Sell