import React, {useState, useEffect} from 'react'
import {Outlet, useLocation} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import NavigateBar from './Components/NavigateBar'
import Welcome from './Components/Welcome'

function App () {
  const [stock, setStock] = useState()
  const [quote, setQuote] = useState()
  const [intraday, setIntraday] = useState()
  const [news, setNews] = useState()
  const [user, setUser] = useState(null)
  const [search, setSearch] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jsonList, setJsonList] = useState()
  const [logo, setLogo] = useState()
  const [graph, setGraph] = useState()
  // const [graph2, setGraph2] = useState()
  const [topTrades, setTopTrades] = useState()

  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation() 


  // GET RANDOM STOCK 
useEffect(() => {
fetch('api/random_stock')
.then(r => r.json())
.then (data => {
    // console.log(data)
    setStock(data)
})  
}, []);


// RANDOM STOCK FUNCTION 
function handleRandomStock() {
  fetch('api/random_stock')
  .then(r => r.json())
  .then (data => {
      // console.log(data)
      setStock(data)
      setQuote(data)
  }) 
  .catch((error) => {
    console.error('Error fetching random stock:', error);
  });
}


// GET STOCK LOGO 
useEffect(() => {
  if (stock) {
    
  fetch(`api/logo/${stock?.symbol}`)
  .then(r => r.json())
  .then (data => {
      // console.log(data)
      setLogo(data)
  })
  .catch((error) => {
    console.error('Error fetching stock logo:', error);

  });
}
  }, [stock]);


  // GET GRAPH DATA FOR METRICS
  useEffect(() => {
    if (stock) {
      
    fetch(`api/SMA/${stock?.symbol}`)
    .then(r => r.json())
    .then (data => {
        // console.log(data)
        setGraph(data)
    })
    .catch((error) => {
      console.error('Error fetching graph data:', error);
  
    });
  }
    }, [stock]);


    // GET GRAPH 2 DATA 
    // useEffect(() => {
    //   if (stock) {
        
    //   fetch(`api/thirty_day/${stock?.symbol}`)
    //   .then(r => r.json())
    //   .then (data => {
    //       console.log(data)
    //       setGraph2(data)
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching graph 2 data:', error);
    
    //   });
    // }
    //   }, [stock]);


// GET STOCK PRICE DETAILS
  useEffect(() => {
    if (stock) {
      
    fetch(`api/stock_price/${stock?.symbol}`)
    .then(r => r.json())
    .then (data => {
        // console.log(data)
        setQuote(data)
    })
    .catch((error) => {
      console.error('Error fetching stock price:', error);
    });
    }
    }, [stock]);



  // GET STOCK INTRADAY DATA 
  useEffect(() => {
    if (stock) {
      // console.log(stock)
    fetch(`api/intraday/${stock?.symbol}`)
    .then(r => r.json())
    .then (data => {
        // console.log(data)
        setIntraday(data)
    })
    .catch((error) => {
      console.error('Error fetching intraday data:', error);
    });
  }
    }, [stock]);


// GET STOCK MARKET NEWS
  useEffect(() => {
    if (stock) {
    fetch(`api/news/${stock?.symbol}`)
    .then(r => r.json())
    .then (data => {
        // console.log(data.slice(1, 6))
        setNews(data.slice(1, 10))
    })
    .catch((error) => {
      console.error('Error fetching news:', error);
    });
  }
    }, [stock]);


// GET JSON FILE
  useEffect(() => {
    fetch('api/tickers_list')
    .then(r => r.json())
    .then (data => {
        // console.log(data)
        setJsonList(data)
    })  
    }, []);


// GET TOP GAINERS & LOSERS 
  useEffect(() => {
    fetch('api/top_trades')
    .then(r => r.json())
    .then(data => {
      // console.log(data)
      setTopTrades(data)
    })

  }, []) 

// GET USER 
  useEffect(() => {
    fetch('api/user/')
    .then(r => {
      if (r.ok){
        return r.json()
      }
    throw Error()
    })
    .then (data => {
        setUser(data)
    })  
    
    }, []);



// SEARCH FUNCTION
  function handleSearch(searchTerm){
    setSearch(searchTerm)
  }

// FILTERS JSON LIST 
  const filteredStocks = search.trim() === ""
  ? []
  : jsonList?.filter(list => list?.name.toLowerCase().includes(search.toLowerCase()))


  // TOP TRADES MAP
  const filteredTopTrades = topTrades?.map((t) => {
    return (
        <div className="top-trades-slides" >
          <p className="top-trades-text" style={{fontWeight: 300}}> {t?.ticker}</p>
          <p className="top-trades-text"> prev close: ${t?.price}</p>
          <p className="top-trades-text" style={{color:'green'}}> change: +${t?.change}</p>
          <p className="top-trades-text" style={{color:'green'}}> %change: {t?.percentage}↑</p>
        </div>        
    )
  });


return (
<div className="app-container">
    {user === null ? (
      <Welcome user = {user} setUser = {setUser}  setIsLoggedIn = {setIsLoggedIn}/>) : (
      <div>
        <header className="header">
          <h1> 
            <NavigateBar user = {user} setUser = {setUser} setIsLoggedIn = {setIsLoggedIn} />
          </h1>
          <div className="top-trades" style={{color: 'white'}}> 
            {filteredTopTrades}
            Top Trades:
            {filteredTopTrades}
          </div>
        </header>

      <Outlet context = {{ stock, setStock, handleRandomStock, logo, quote, intraday, news, user, search, graph, handleSearch, filteredStocks, isLoading}} />

      </div>
    )};
</div>

);

};

export default App;
