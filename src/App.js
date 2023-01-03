import React, { useState } from "react";
import Home from "./homepage/home";
import Login from "./login/login";
import Register from "./register/register";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [user,setLoginUser]= useState({
    "username":"",
    "email":"",
    "password":"",
    "todo": []
  })

  const [themes, setThemes] = useState("#d1e8e2")
  return (
    <div className="app" style={{backgroundColor:`${themes}`}}>
      <Router>
        <Routes>
          <Route exact path="/" 
             element={user && user._id? <Home user={user} setLoginUser={setLoginUser} setThemes={setThemes}/>: <Login setLoginUser={setLoginUser}/>}>

          </Route>
          <Route exact path="/register" element={<Register />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
