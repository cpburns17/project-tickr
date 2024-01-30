import React from "react";
import App from './App.jsx'
import Invest from './Components/Invest.jsx'
import Home from './Components/Home.jsx'
import StockCard from './Components/StockCard.jsx'
import Portfolio from './Components/Portfolio.jsx'
import Search from "./Components/Search.jsx";
import Metrics from "./Components/Metrics.jsx"
import News from "./Components/News.jsx"



const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <h1>Something went wrong!</h1>,
        children : [
        {
            path: "/home",
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
        
        ]
    }
]

export default routes;