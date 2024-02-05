import React, {useState, useEffect} from "react"
// import { useOutletContext } from "react-router-dom"

function Welcome () {
    const [filterValue, setFilterValue] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
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
        Welcome Page!!!
        <Signup setIsLoggedIn = {setIsLoggedIn} setUser = {setUser}/>
        <Login attemptLogin = {attemptLogin}/>
    </div>

)

}

export default Welcome

