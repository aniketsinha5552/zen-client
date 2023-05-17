import React, { useState } from 'react'
import './register.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email:"",
        password:"",
        username:"",
        confirmPassword:""
    }) 

    function HandleChange(e){
        if(e.target.placeholder==='Email'){
            setUser({...user,email: e.target.value})
        }
        else if(e.target.placeholder==='Username'){
            setUser({...user,username: e.target.value})
        }
        else if(e.target.placeholder==='Password'){
            setUser({...user,password: e.target.value})
        }
        else if(e.target.placeholder==='Confirm Password'){
            setUser({...user,confirmPassword: e.target.value})
        }

        
        
        
    }
  
function register(){
    console.log(user)
    const { username,email,password, confirmPassword}= user
    if(username && email && password && password=== confirmPassword){
         // local= http://localhost:5000/
    // deploy= https://zen-server-production.up.railway.app/
        axios.post("http://localhost:5000/register", {
            username,
            email ,
            password
        })
        .then(res=> {
            alert(res.data.message)
            navigate('/')
        })
    }
    else{
        alert('invalid input')
    }
    
}

  return (
    <div className='register'>
         <h1 style={{textAlign:"center"}} >Zen ☯️ <small style={{ fontWeight: "lighter", fontSize: "20px" }}>
            your virtual study environment
          </small></h1>
    <form >
    <div id='loginForm'>
    <h1 id='loginHead'>Register</h1>
        <input id='username' placeholder='Email' value={user.email} onChange={HandleChange}></input>
        <br/>
        <input id='username' placeholder='Username' value={user.username} onChange={HandleChange}></input>
        <br/>
        <input id='username' placeholder='Password' value={user.password} onChange={HandleChange}></input>
        <br/>
        <input id='username' placeholder='Confirm Password' value={user.confirmPassword} onChange={HandleChange}></input>
        <br/>
        <button id="loginBtn" type="button" title="Register"onClick={register}>Register</button>
    <span id="registerRedirect">Already a user? <a style={{textDecoration:"none", color:"#5d5c61"}} href="/">Login</a></span>
        </div>
    </form>
</div>
  )
}
