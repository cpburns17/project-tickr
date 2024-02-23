import React, {useState, useEffect} from "react"
import { useOutletContext, useNavigate } from "react-router-dom"

import { TextField } from '@mui/material';


function Search () {

    const {search, handleSearch, filteredStocks, setStock} = useOutletContext()

    
    const navigate = useNavigate() 

    function handleClick (stock) {
        stock.symbol = stock.ticker
        fetch('api/overview/'+stock.symbol)
        .then(r => r.json())
        .then (data => {
            console.log(data)
            setStock(data)
    })  
        
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

return(
    <div className="search-container">
        <h1 className="search-title">Looking for a specific stock? </h1>
        <div >
            <TextField
                id="search-input"
                onChange={handleSearchChange}
                label="Search by company name..."
                variant="outlined"
                value={search}
                fullWidth
                sx={{
                    backgroundColor: "white",
                    width: "60vw", // Adjust the width as needed
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: "black" // Set the outline color
                        },
                        "&:hover fieldset": {
                            borderColor: "black" // Set the outline color on hover
                        }
                    }
                }}
            />
            <i className="search-box" />

            {listSearch}

        </div>
    </div>

);

};

export default Search