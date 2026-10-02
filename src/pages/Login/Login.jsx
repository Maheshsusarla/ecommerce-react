import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import './Login.css'

const Login = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");

  const navigate=useNavigate();

  function handleLogin(e){
    e.preventDefault();

    // getting the data from localstorage
    const users=JSON.parse(localStorage.getItem("users")) || [];

    // check email -password match or not 
    const user=users.find(
      (u)=>u.email===email && u.password===password
    );


    if(!user){
      setError("Invalid email or password");
      return;
    }

    // save the current user data
    localStorage.setItem("currentUser",JSON.stringify(user));
    navigate("/products")

  }
  return (
    <div className='login-container'>
      <form className='login-form' onSubmit={handleLogin}>

        <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} />

        <button type='submit'>Login</button>
        {error && <p className="error">{error}</p>}

        <p>New User ? <Link to="/signup">Sign Up</Link></p>

      </form>
      
    </div>
  )
}

export default Login