import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";

function Signup ({setIsLoggedIn, setUser}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [balance, setBalance] = useState(20000)
    const navigate = useNavigate();

    const handleUsername = (e) => {
        setUsername(e.target.value);
        };
    
    const handlePassword = (e) => {
    setPassword(e.target.value);
    };

    const handleName = (e) => {
    setName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // setIsLoggedIn(true);

    const newUser = {
        username: username,
        password: password,
        name: name,
        balance: balance,
    };

    fetch("api/user", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
    })
        .then((r) => r.json())
        .then((data) => {
        console.log("User created:", data);
        setUser(data);
        // Redirects to login
        navigate('/slides');
        })
        .catch((error) => {
        console.error("Error creating user:", error);
        });

    }

return (
    <div className="d-flex justify-content-center align-items-center">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
            <form onSubmit={handleSubmit} >
                <h2 className="mb-1 text-center">Sign Up</h2>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={handleUsername}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={handlePassword}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={handleName}
                    />
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    </div>
    
);

};

export default Signup