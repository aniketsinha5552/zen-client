import React, { useState } from 'react'
import './register.css'
import { useForm } from 'react-hook-form'
import {auth} from '../firebase'
import { createUserWithEmailAndPassword,updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { buttonClick } from '../assets/functions/clickSound'
import { Icon } from '@iconify/react'


export default function SignUp({setUser}) {
    const navigate= useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
      } = useForm();

    const registerUser = (data) => {
        buttonClick.play();
        const {email,username,pass,cpass}=data
        if(pass!==cpass){
          alert("Invalid Credentials!")
          return
        }
        createUserWithEmailAndPassword(auth,email, pass).then(async(userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user)
          await updateProfile(user,{
            displayName:username
          })
          setUser({
            email:user.email,
            username:user.displayName,
            id:user.uid
          })
          reset()
          navigate('/')
          
          // ...
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage)
          console.log(errorCode,errorMessage)
          // ..
        })
    }
   
  return (
    <div className='register'>
         <h1 style={{textAlign:"center"}} >Zen <Icon className="yinyang" icon="openmoji:yin-yang" /> <small style={{ fontWeight: "lighter", fontSize: "20px" }}>
            your virtual study environment
          </small></h1>
    <form onSubmit={handleSubmit(registerUser)} >
    <div id='loginForm'>
    <h1 id='loginHead'>Register</h1>
        <input id='username' placeholder='Email' {...register("email",{required:true})}></input>
        <input id='username' placeholder='Username' {...register("username",{required:true})}></input>
        <input id='username' type='password' placeholder='Password' {...register("pass",{required:true})}></input>
        <input id='username' type='password' placeholder='Confirm Password' {...register("cpass",{required:true})}></input>
        <button id="loginBtn" title="Register">Register</button>
    <span id="registerRedirect">Already a user? <a style={{textDecoration:"none", color:"#5d5c61"}} href="/">Login</a></span>
        </div>
    </form>
</div>
  )
}
