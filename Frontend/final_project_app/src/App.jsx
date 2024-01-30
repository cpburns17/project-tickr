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


useEffect(() => {
fetch('http://localhost:5555/random_stock')
.then(r => r.json())
.then (data => {
    console.log(data)
    setStock(data)
})  
}, []);


useEffect(() => {
  if (stock) {
  fetch(`http://localhost:5555/stock_price/${stock?.symbol}`)
  .then(r => r.json())
  .then (data => {
      console.log(data)
      setQuote(data)
  })
}
  }, [stock]);

  useEffect(() => {
    if (stock) {
    fetch(`http://localhost:5555//intraday/${stock?.symbol}`)
    .then(r => r.json())
    .then (data => {
        console.log(data)
        setIntraday(data)
    })
  }
    }, [stock]);



function handleRandomStock() {
  fetch('http://localhost:5555/random_stock')
  .then(r => r.json())
  .then (data => {
      console.log(data)
      setStock(data)
      setQuote(data)
  }) 

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
    <Outlet context = {{ stock, setStock, handleRandomStock, quote, intraday}} />

  </div>
</div>

);


}
export default App;
