import React, { useState,useNavigate } from 'react'
import './login.css'
import axios from 'axios'
import {auth} from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useForm } from 'react-hook-form'
import { buttonClick } from '../assets/functions/clickSound'

export default function Login({setUser}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
      } = useForm();

      const loginUser = (data) => {
        buttonClick.play();
        signInWithEmailAndPassword(auth,data.email, data.pass).then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          setUser({
            email:user.email,
            username:user.displayName,
            id:user.uid
          })
          
        }).catch((error) => {
          alert("Some error occured, please try again")
        })
      }
   

  return (
    <div className='login'>
       <h1  >Zen ☯️ <small style={{ fontWeight: "lighter", fontSize: "20px" }}>
            your virtual study environment
          </small></h1>
        <form onSubmit={handleSubmit(loginUser)} >
        <div id='loginForm'>
        <h1 id='loginHead'>Login</h1>
            <input id='username' placeholder='Email' {...register("email",{required:true})}></input>
            <input id='password' type="password" placeholder='Password' {...register("pass",{required:true})} ></input>
            <button id="loginBtn" title="Login" >Login</button>
            <span id="registerRedirect">Not a User? <a style={{textDecoration:"none", color:"#5d5c61"}} href="/register">Register</a></span>
        </div>
        </form>
      
    </div>
  )
}
