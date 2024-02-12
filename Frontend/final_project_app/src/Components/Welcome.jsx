import React, {useState, useEffect} from "react"
import { useOutletContext, useNavigate } from "react-router-dom"
import Login from './Login'
import Signup from './Signup'

import Button from 'react-bootstrap/Button';

function Welcome ({user, setUser, setIsLoggedIn}) {
    const [filterValue, setFilterValue] = useState("");
    const [begin, setBegin] = useState(false)
    const [showSignup, setShowSignup] = useState(false);

    const navigate = useNavigate();
    
    // console.log(isLoggedIn);
    console.log(user);
    
    function handleClick() {
        setBegin(true)
    }


    useEffect(() => {
    fetch(`api/check_session`).then((res) => {
        if (res.ok) {
        res.json().then((user) => setUser(user));
        }
    });
    }, []);
    
    // Authentication
    function attemptLogin(userInfo) {
    fetch(`api/login`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
        },
        body: JSON.stringify(userInfo),
    })
        .then((res) => {
        if (res.ok) {
            return res.json();
            
        }
        alert("username and/or password not found")
        throw res;
        })
        .then((data) => {
        navigate("/");
        setUser(data);
        })
        .catch((e) => console.log(e));
    }


return (

    <div className="welcome-page">
        <h2 className="welcome-h2"> Welcome to Tickr! </h2>
        <br></br>
        <p className="welcome-text">Tickr’s goal is to educate and entertain users who are interested in mock-investing in the stock market, but have little to no experience or knowledge of stocks. </p>
        <p className="welcome-text">Upon signup, you can choose to go through a quick, high-level introduction of the stock market, along with important terminology needed to navigate a traditionally complex industry. Or, you can jump right in and be matched with a random stock. </p>
        <p className="welcome-text">You will be given “$10,000” of ticker money which you can use to invest in real stocks, in real time. Keep in mind, this isn’t real money, so your investments won’t have any impact on the market. However, Tickr tracks all of your trades in your Portfolio, so you will get a feel for what it COULD be like to make (or lose!) money. </p>
        <p className="welcome-text">Once you feel like you have a good enough understanding of the stock market, we encourage users to continue their stock trading journey by creating a robinhood, E-trade, or Fidelity account. These applications are fantastic for real investing!</p>
        <p className="welcome-text">Happy Trading! 🎉</p>
        <br></br>
        <br></br>

        {user === null && !showSignup ? (
            <Login attemptLogin = {attemptLogin}/>
        ) : null}

        {user === null && showSignup ? (
            <Signup setIsLoggedIn = {setIsLoggedIn} setUser = {setUser}/>
        ) : null}

        {user === null ? (
        <div className="d-flex justify-content-center mt-3">
            <button
                className="btn btn-primary"
                onClick={() => setShowSignup(!showSignup)}
            >
                {showSignup ? "Go to Login" : "Go to Signup"}
            </button>
            
        </div>

    ) : null}
    <br></br>


    </div>

)

}

export default Welcome

