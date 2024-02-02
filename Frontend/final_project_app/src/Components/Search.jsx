import React, {useState, useEffect} from "react"
import { useOutletContext, useNavigate } from "react-router-dom"

function Search () {

    const {search, handleSearch, filteredStocks, setStock} = useOutletContext()

    
    const navigate = useNavigate() 

    function handleClick (stock) {
        stock.symbol = stock.ticker
        setStock(stock)
        navigate('/', {state: stock})
        console.log(stock)

    }

    function handleSearchChange(e){
        handleSearch(e.target.value)

        
    }

    const listSearch = filteredStocks.map((stock)=>{
        return <div>
            <h1 className="search-results"onClick={() => handleClick(stock)}>{stock.name}</h1>
        </div>
    })


    // useEffect(() => {
    //     fetch('http://localhost:5555/search')
    //     .then(r => r.json())
    //     .then (data => {
    //         console.log(data)
    //         setStock(data)
    //     })  
    //     }, []);

return(

<div>
    Search here...
    <div className="search-container">
        <div >
            <input 
            onChange={handleSearchChange}
            className="prompt"
            placeholder="Search by ticker symbol.."
            value={search}
            />
            <i className="search-box" />
            {listSearch}
        </div>
    </div>
</div>
)

}

export default Search