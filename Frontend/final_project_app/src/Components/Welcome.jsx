import React, {useState, useEffect} from "react"
import { useOutletContext, useNavigate } from "react-router-dom"
import Login from './Login'
import Signup from './Signup'

function Welcome ({user, setUser}) {
    const [filterValue, setFilterValue] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [user, setUser] = useState(null);
    const [showSignup, setShowSignup] = useState(false);
    const navigate = useNavigate();
    
    console.log(isLoggedIn);
    console.log(user);
    
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
        throw res;
        })
        .then((data) => {
        navigate("/");
        setUser(data);
        })
        .catch((e) => console.log(e));
    }


return (

    <div>
        Welcome to Tickr!
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

    </div>

)

}

export default Welcome

