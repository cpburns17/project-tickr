import React, {useState, useEffect} from 'react'
// import {useNavigate} from 'react-router-dom'
import {Outlet, useLocation} from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import NavigateBar from './Components/NavigateBar'
import Welcome from './Components/Welcome'
// import Logout from './Components/Logout'


function App () {
  const [stock, setStock] = useState()
  const [quote, setQuote] = useState()
  const [intraday, setIntraday] = useState()
  const [news, setNews] = useState()
  const [user, setUser] = useState(null)
  const [search, setSearch] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [jsonList, setJsonList] = useState()
  const location = useLocation() 


useEffect(() => {
fetch('api/random_stock')
.then(r => r.json())
.then (data => {
    // console.log(data)
    setStock(data)
})  
}, []);

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




// RANDOM Stock function
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

// Get from JSON File
useEffect(() => {
  fetch('api/tickers_list')
  .then(r => r.json())
  .then (data => {
      // console.log(data)
      setJsonList(data)
  })  
  }, []);



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
      console.log(data)
  })  
  }, []);

  console.log(user)


  //Search function 
function handleSearch(searchTerm){
  setSearch(searchTerm)
}

  const filteredStocks = search.trim() === ""
  ? []
  : jsonList?.filter(list => list?.name.toLowerCase().includes(search.toLowerCase()))




return (
  <>
  
  {user === null ? (
    <Welcome user = {user} setUser = {setUser}  setIsLoggedIn = {setIsLoggedIn}/>) : (
      
<div>
  <header>
    <h1> 
      <NavigateBar user = {user} setUser = {setUser} setIsLoggedIn = {setIsLoggedIn} />
      {/* <Logout user={user} setUser = {setUser} setIsLoggedIn = {setIsLoggedIn}/> */}
    </h1>
  </header>

  <div >
    
    {/* <Welcome /> */}
    <Outlet context = {{ stock, setStock, handleRandomStock, quote, intraday, news, user, search, handleSearch, filteredStocks}} />

  </div>
</div>
  )}


{/* 
  <header>
    <h1> 
      <NavBar user = {user}/>
    </h1>
  </header>
  <div>
    <Outlet context = {{ stock, setStock, handleRandomStock, quote, intraday, news, user, search, handleSearch, filteredStocks}} />
  </div> */}



</>

);


}
export default App;
