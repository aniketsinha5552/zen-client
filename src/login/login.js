import React, { useState,useNavigate } from 'react'
import './login.css'
import axios from 'axios'

export default function Login({setLoginUser}) {
    const [user, setUser]= useState({
        email:"",
        password:""
    })
    
    function HandleUser(e){
          if(e.target.placeholder==='Email'){
            setUser({...user,email:e.target.value})
          }
          else if(e.target.placeholder==='Password'){
            setUser({...user,password:e.target.value})
          }
         
    }
  
    // local= http://localhost:5000/
    // deploy= https://zen-server-production.up.railway.app/
    function login(){
      axios.post("http://localhost:5000/login", user)
      .then(res=>{
        // store the user in localStorage
        localStorage.setItem('user', JSON.stringify(res.data.user))
        setLoginUser(JSON.stringify(res.data.user))
      })
    }

  return (
    <div className='login'>
       <h1  >Zen ☯️ <small style={{ fontWeight: "lighter", fontSize: "20px" }}>
            your virtual study environment
          </small></h1>
        <form >
        <div id='loginForm'>
        <h1 id='loginHead'>Login</h1>
            <input id='username' placeholder='Email' onChange={HandleUser}></input>
            <br/>
            <input id='password' type="password" placeholder='Password' onChange={HandleUser}></input>
            <br/>
            <button id="loginBtn" type='button' title="Login" onClick={login}>Login</button>
            <span id="registerRedirect">Not a User? <a style={{textDecoration:"none", color:"#5d5c61"}} href="/register">Register</a></span>
        </div>
        </form>
      
    </div>
  )
}
