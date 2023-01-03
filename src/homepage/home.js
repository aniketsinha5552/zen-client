import React, { useId, useState } from 'react'
import './home.css'
import axios from 'axios'
import Timer from '../components/Timer/Timer'
import Themes from '../components/Themes/Themes'
import MediaPlayer from '../components/MediaPlayer/MediaPlayer'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import Clock from '../components/Clock/Clock';
import SaveIcon from '@mui/icons-material/Save';

export default function Home({user,setLoginUser,setThemes}) {
  const [todo, setTodo] = useState(user.todo)
  const todoList = todo.map((item,index)=>{
    
    return(
      <ul key={index}>
           <li>{item} <button title='Task Completed' id="addTodo" onClick={()=>removeItem(item)}><DoneIcon/></button></li> 
      </ul>   
    )
    
  })
  const [todoItems, setTodoItems]= useState('')

  function removeItem(item){
     const itemIndex= todo.indexOf(item)
     console.log(itemIndex)
      setTodo([...todo.slice(0,itemIndex),...todo.slice(itemIndex+1,todo.length)])
     
  }

  function updateTodo(){
    setTodo(prev=>[...prev,todoItems]) 
    const input =document.getElementById("todoInput")
    input.value= null
  }

  function saveList(){
    const { username,email,password}= user  
    axios.post("http://localhost:5000/update", {
           username,
           email ,
           password,
           todo: todo
       })
       .then(res=> {
           alert("List saved")
       })
  }

  return (
    <div className='home'>
      <div className='heading'>
       <span>welcome back, {user.username}</span> 
       <span><button title='logout' onClick={()=>(setLoginUser({}))}><ExitToAppIcon/></button></span> 
      </div>
       <Clock/>
        <h1 style={{textAlign:"center",marginTop:"-20px"}}>Zen ☯️</h1>
        <div className='body' >
        <div className='todoList' >
        <Timer />

        {/* To-do list */}
        <h3 style={{marginTop:"20px"}}>To-do List</h3>
        <input placeholder='Add an item' id="todoInput" onChange={(e)=>setTodoItems(e.target.value)}></input>
        <button title='Add Item' onClick={updateTodo}><AddIcon/></button>
        <button title='Save List' onClick={saveList}><SaveIcon/></button>
        <br/> 
        {todoList}
        </div>
        <MediaPlayer/>
        
      
        <Themes setThemes={setThemes}/>
        </div>
        <footer className='footer'>
          <span>This app was created by <span style={{color:"#05386b"}}>Aniket Sinha</span></span>
        </footer>
       
        

    </div>
  )
}
