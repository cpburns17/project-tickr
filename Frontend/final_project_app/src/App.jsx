import React, {useState, useEffect} from 'react'
// import {useNavigate} from 'react-router-dom'
import {Outlet} from 'react-router-dom'

import './App.css'
import NavBar from './Components/Navbar'
import Welcome from './Components/Welcome'

function App () {
  const [ticker, setTicker] = useState()




useEffect(() => {
fetch('http://localhost:5555/random_stock')
.then(r => r.json())
.then (data => {
    console.log(data)
    setTicker(data.stock.ticker)
})  
}, []);

function handleRandomTicker() {
  fetch('http://localhost:5555/random_stock')
  .then(r => r.json())
  .then (data => {
      console.log(data.stock.ticker)
      setTicker(data.stock.ticker)
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
    <Outlet context = {{ ticker, setTicker, handleRandomTicker }} />
  </div>
</div>

);


}
export default App;
