import React, { useEffect, useState,useContext } from 'react'
import './Clock.css'
import { themeContext } from '../../homepage/home';
import { newShade } from '../../App';

export default function Clock() {
   const contextData= useContext(themeContext)
   const theme = contextData.themes
    const [time, setTime]= useState()
    useEffect(()=>{
       setInterval(()=>{
            const date = new Date()
            setTime(date.toLocaleTimeString())
       },1000)
    },[])
  return (
    <div className='clock' style={{backgroundColor:newShade(theme,-30)}}>
        {time}
    </div>
  )
}
