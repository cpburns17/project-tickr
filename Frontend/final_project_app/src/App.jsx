import React, {useState, useEffect} from 'react'
// import {useNavigate} from 'react-router-dom'
import {Outlet} from 'react-router-dom'

import './App.css'
import NavBar from './Components/Navbar'
import Welcome from './Components/Welcome'

function App () {
  const [stock, setStock] = useState()
  const [quote, setQuote] = useState()
  const [intraday, setIntraday] = useState()
  const [news, setNews] = useState([])
  const [user, setUser] = useState()


useEffect(() => {
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
    fetch(`http://localhost:5555//intraday/${stock?.symbol}`)
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
          // console.log(data)
          setNews(data.slice(0, 5))
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







return (
<div>
  <header>
    <h1> 
      <NavBar />
    </h1>
  </header>

  <div>
    
    {/* <Welcome /> */}
    <Outlet context = {{ stock, setStock, handleRandomStock, quote, intraday, news, user}} />

  </div>
</div>

);


}
export default App;
