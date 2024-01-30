import React, {useState} from "react"
import { useOutletContext } from "react-router-dom"

function News () {
    const {news} = useOutletContext()


return (

    <div>
        <h1>Company Information</h1>
        {/* <p>{news}</p>
        <p> {news?.authors}</p>
        <p>{news?.title}</p>
        <p>{news?.url}</p>
         */}
    </div>

);

}

export default News