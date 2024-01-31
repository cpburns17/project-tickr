import React, {useState, useEffect} from "react"
// import {useOutletContext} from "react-router-dom"

function Portfolio () {
    // const {total} = useOutletContext
  const [total, setTotal] = useState()



useEffect(() => {
    fetch('http://localhost:5555/user/1')
    .then(r => r.json())
    .then (data => {
        console.log(data)
        setTotal(data)
    })  
    }, []);

return (

    <div>
        Balance: {total?.balance}
    </div>

);

}

export default Portfolio