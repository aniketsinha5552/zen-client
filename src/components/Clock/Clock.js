import React, { useEffect, useState,useContext } from 'react'
import './Clock.css'
import { themeContext } from '../../homepage/home';
import { newShade } from '../../App';

export default function Clock() {
   const contextData= useContext(themeContext)
   const theme = contextData.themes
    const [time, setTime]= useState()
    const date = new Date()
    const day= date.toLocaleString('default',{weekday:'long',month:'long',day:'numeric'})
    useEffect(()=>{
       setInterval(()=>{
            const date = new Date()
            setTime(date.toLocaleTimeString())
       },1000)
    },[])
  return (
    <div className='clock' >
        {time}
        <br/>
        {day}
    </div>
  )
}
