import React, { useEffect, useState } from 'react'
import './Clock.css'

export default function Clock() {
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
