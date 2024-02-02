import React, {useState, useEffect} from 'react'
// import {useNavigate} from 'react-router-dom'
import {Outlet, useLocation} from 'react-router-dom'

import './App.css'
import NavBar from './Components/Navbar'
import Welcome from './Components/Welcome'

function App () {
  const [stock, setStock] = useState()
  const [quote, setQuote] = useState()
  const [intraday, setIntraday] = useState()
  const [news, setNews] = useState()
  const [user, setUser] = useState()
  const [search, setSearch] = useState("")

  const [jsonList, setJsonList] = useState()
  const location = useLocation() 


useEffect(() => {
  if location:
    setStock(location.state.stock)
  else:
fetch('http://localhost:5555/random_stock')
.then(r => r.json())
.then (data => {
    // console.log(data)
    setStock(data)
})  
}, []);

useEffect(() => {
  if (stock) {
  fetch(`http://localhost:5555/stock_price/${stock?.symbol}`)
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

  useEffect(() => {
    if (stock) {
      console.log(stock)
    fetch(`http://localhost:5555/intraday/${stock?.symbol}`)
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

    useEffect(() => {
      if (stock) {
      fetch(`http://localhost:5555/news/${stock?.symbol}`)
      .then(r => r.json())
      .then (data => {
          console.log(data.slice(1, 6))
          setNews(data.slice(1, 10))
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
      });
    }
      }, [stock]);

    useEffect(() => {
      fetch('http://localhost:5555/user/1')
      .then(r => r.json())
      .then (data => {
          console.log(data)
          setUser(data)
      })  
      }, []);



function handleRandomStock() {
  fetch('http://localhost:5555/random_stock')
  .then(r => r.json())
  .then (data => {
      console.log(data)
      setStock(data)
      setQuote(data)
  }) 
  .catch((error) => {
    console.error('Error fetching random stock:', error);
  });

}

useEffect(() => {
  fetch('http://localhost:5555/tickers_list')
  .then(r => r.json())
  .then (data => {
      // console.log(data)
      setJsonList(data)
  })  
  }, []);


function handleSearch(searchTerm){
  setSearch(searchTerm)
}

  const filteredStocks = search.trim() === ""
  ? []
  : jsonList?.filter(list => list?.name.toLowerCase().includes(search.toLowerCase()))






return (
<div>
  <header>
    <h1> 
      <NavBar />
    </h1>
  </header>

  <div>
    
    {/* <Welcome /> */}
    <Outlet context = {{ stock, setStock, handleRandomStock, quote, intraday, news, user, search, handleSearch, filteredStocks}} />

  </div>
</div>

);


}
export default App;
