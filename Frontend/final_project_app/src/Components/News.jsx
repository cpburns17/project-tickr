import React, {useState} from "react"
import { useOutletContext, useNavigate } from "react-router-dom"

function News () {
    const {news, stock} = useOutletContext()
    const navigate = useNavigate();


    function handleGoBack() {
        navigate(-1);
    }

    const formatPublishedDate = (dateString) => {
        // Assuming dateString is in the format YYYYMMDD
        const year = dateString.slice(0, 4);
        const month = dateString.slice(4, 6);
        const day = dateString.slice(6, 8);
    
        return `${year}/${month}/${day}`;
    };

    const marketNews = news?.map((n, index) => (
        <div> 
        <li key = {index}> 
        <h2>{n.title}</h2>
        <h3>Authors: {n.authors}</h3>
        <p>"{n.summary}"</p>
        <p>Published: {formatPublishedDate(n.published)}</p>
        <p>{n.source_domain}</p>
        {/* <p>{n.url}</p> */}
        </li>
        </div>
    ))

    console.log(marketNews)

return (

    <div>
        <h1>Market News Feed</h1>
        <h2>{stock?.name}</h2>
        <br></br>
                <button  onClick={handleGoBack}> Go Back </button>
        {marketNews}
    </div>

);

}

export default News

//(n.published.slice(0, 8))