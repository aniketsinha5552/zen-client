import React, { useEffect, useState } from 'react'
import './Clock.css'

export default function Clock() {
    const [time, setTime]= useState()
    useEffect(()=>{
       setInterval(()=>{
            const date = new Date()
            setTime(date.toLocaleTimeString())
       },1000)
    },[])
  return (
    <div className='clock'>
        {time}
    </div>
  )
}
