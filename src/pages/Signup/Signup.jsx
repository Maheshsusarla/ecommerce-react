import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Signup.css"

const Signup = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    function handleSignup(e) {
        e.preventDefault();
        if (!name || !email || !password) {
            setError("All fields are required");
            return;
        }

        // get the data from localstorage
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // check if the email already exists or not
        const exists = users.find((user) => user.email === email);
        if (exists) {
            setError("This email is already registered");
            return;
        }

        // if new user then push 
        users.push({ name, email, password })
        localStorage.setItem("users", JSON.stringify(users));



        alert("Signup successful! Please login.")
        navigate("/login")
    }

    return (
        <div className='signup-container'>
            <form className='signup-form' onSubmit={handleSignup}>
                <h2>Create Account </h2>

                {error && <p className="error">{error}</p>}

                <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type='submit'>Sign Up</button>

                <p>Already have an account ? <Link to="/login">Login</Link> </p>

            </form>
        </div>
    )
}

export default Signup