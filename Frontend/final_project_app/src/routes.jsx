import React from "react";
import App from './App.jsx'
import Invest from './Components/Invest.jsx'
import Home from './Components/Home.jsx'
import StockCard from './Components/StockCard.jsx'
import Portfolio from './Components/Portfolio.jsx'
import Search from "./Components/Search.jsx";
import Metrics from "./Components/Metrics.jsx"
import News from "./Components/News.jsx"
import Transactions from './Components/Transactions.jsx'
import Sell from './Components/Sell.jsx'
import Buy from './Components/Buy.jsx'
import Login from './Components/Login.jsx'
import Signup from './Components/Signup.jsx'
// import SingleTransaction from './Components.SingleTransaction.jsx'



const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <h1>Something went wrong!</h1>,
        children : [
        {
            path: "/",
            element: <Home/>,
            errorElement: <h1>Something went wrong!</h1>
        },
        {
            path: "/portfolio",
            element: <Portfolio />,
            errorElement: <h1>Something went wrong!</h1>
        },
        {
            path: "/search",
            element: <Search />,
            errorElement: <h1>Something went wrong!</h1>
        },
        {
            path: "/stock",
            element: <StockCard />,
            errorElement: <h1>Something went wrong!</h1>
        },
        {
            path: "/metrics",
            element: <Metrics />,
            errorElement: <h1>Something went wrong!</h1>
        },
        {
            path: "/news",
            element: <News />,
            errorElement: <h1>Something went wrong!</h1>
        },
        {
            path: "/invest",
            element: <Invest />,
            errorElement: <h1>Something went wrong!</h1>
        },
        {
            path: "/sell",
            element: <Sell />,
            errorElement: <h1>Something went wrong!</h1>
        },
        {
            path: "/buy",
            element: <Buy />,
            errorElement: <h1>Something went wrong!</h1>
        },
        {
            path: "/transactions",
            element: <Transactions />,
            errorElement: <h1>Something went wrong!</h1>
        },
        {
            path: "/signup",
            element: <Signup />,
            errorElement: <h1>Something went wrong!</h1>
        },
        {
            path: "/login",
            element: <Login />,
            errorElement: <h1>Something went wrong!</h1>
        },
        // {
        //     path: "/transaction-history",
        //     element: <SingleTransaction />,
        //     errorElement: <h1>Something went wrong!</h1>
        // },
        
        ]
    }
]

export default routes;