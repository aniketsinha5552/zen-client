import React, { useEffect, useState } from 'react'
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import TimerIcon from '@mui/icons-material/Timer';
import './Timer.css'

export default function Timer() {
    const [time,setTime]= useState(0)
    const [timerOn, setTimerOn]= useState(false)

    useEffect(()=>{
       let interval = null

       if(timerOn){
            interval= setInterval(()=>{
                setTime(prevTime=>prevTime+1000)
            },1000)
       }else{
            clearInterval(interval)
       }
       return ()=> clearInterval(interval)
    },[timerOn])
  return (
    <div className='timer'>
        <p style={{marginLeft:"10px"}}><TimerIcon/></p>
        <div id="timerTime">
            <span>{('0'+Math.floor((time/3600000)%60)).slice(-2)} hr :</span>
            <span>{('0'+Math.floor((time/60000)%60)).slice(-2)} min :</span>
            <span>{('0'+((time/1000)%60)).slice(-2)} sec</span>
        </div>
        {!timerOn && <button onClick={()=>setTimerOn(true)}><PlayArrowIcon/></button> }
        {timerOn &&  <button onClick={()=>setTimerOn(false)}><PauseIcon/></button>}
        {!timerOn &&  <button onClick={()=>setTime(0)}><RestartAltIcon/></button> }
        
    </div>
  )
}
