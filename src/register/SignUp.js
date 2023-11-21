import React, { useState } from 'react'
import './register.css'
import { useForm } from 'react-hook-form'
import {auth, provider} from '../firebase'
import { createUserWithEmailAndPassword,signInWithPopup,updateProfile } from 'firebase/auth'
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

    const googleSignIn=(e)=>{
      signInWithPopup(auth,provider).then(async(userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        await updateProfile(user,{
          displayName:user.displayName
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
      e.preventDefault()
      }
   
  return (
    <div className='register'>
         <h1 style={{textAlign:"center"}} >Zen <Icon className="yinyang" icon="openmoji:yin-yang" /> <small style={{ fontWeight: "lighter", fontSize: "20px" }}>
            your virtual study environment
          </small></h1>
    <form onSubmit={handleSubmit(registerUser)} >
    <div id='loginForm'>
    <h1 id='loginHead'>Sign Up</h1>
        <input id='username' placeholder='Email' {...register("email",{required:true})}></input>
        <input id='username' placeholder='Username' {...register("username",{required:true})}></input>
        <input id='username' type='password' placeholder='Password' {...register("pass",{required:true})}></input>
        <input id='username' type='password' placeholder='Confirm Password' {...register("cpass",{required:true})}></input>
        <button id="loginBtn" title="Register">Register</button>
        <button id='googleBtn' onClick={googleSignIn}>
        <Icon icon="flat-color-icons:google" style={{marginRight:"5px"}}/> Google
        </button>
    <span id="registerRedirect">Already have an account? <a style={{textDecoration:"none", color:"#5d5c61"}} href="/">Login now</a></span>
        </div>
    </form>
</div>
  )
}
