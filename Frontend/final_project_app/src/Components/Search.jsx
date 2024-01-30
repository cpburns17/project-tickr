import React, {useState} from "react"
// import { useOutletContext } from "react-router-dom"

function Search () {

    // const {search} = useOutletContext()
    // const {handleSearch} = useOutletContext()
    // const {filteredStocks} = useOutletContext()
    
    // const navigate = useNavigate() 

    // function handleClick (stock) {
    //     navigate('/stockdetails', {state: stock})
    // }

    // function handleSearchChange(e){
    //     handleSearch(e.target.value)
    // }

    // const listSearch = filteredStocks.map((stock)=>{
    //     return <div>
    //         <h1 className="search-results"onClick={() => handleClick(stock)}>{stock.ticker}</h1>
    //     </div>
    // })


return(

<div>
    Search here...
    {/* <div className="search-container">
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
    </div> */}
</div>
)

}

export default Search