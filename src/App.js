import React, { useState ,createContext,useEffect} from "react";
import Home from "./homepage/home";
import Login from "./login/login";
import Register from "./register/register";
import Trivia from "./Trivia";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export const newShade = (hexColor, magnitude) => {
  hexColor = hexColor.replace(`#`, ``);
  if (hexColor.length === 6) {
      const decimalColor = parseInt(hexColor, 16);
      let r = (decimalColor >> 16) + magnitude;
      r > 255 && (r = 255);
      r < 0 && (r = 0);
      let g = (decimalColor & 0x0000ff) + magnitude;
      g > 255 && (g = 255);
      g < 0 && (g = 0);
      let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
      b > 255 && (b = 255);
      b < 0 && (b = 0);
      return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
  } else {
      return hexColor;
  }
};



function App() {
  const [user,setLoginUser]= useState(localStorage.getItem("user"))
  

  const [themes, setThemes] = useState("#d1e8e2")
  return (
    <div className="app" style={{backgroundColor:`${themes}`}}>
      <Router>
        <Routes>
          <Route exact path="/" 
             element={user ? <Home user={user} setLoginUser={setLoginUser} setThemes={setThemes} themes={themes}/>: <Login setLoginUser={setLoginUser}/>}>

          </Route>
          <Route exact path="/register" element={<Register />}></Route>
          {/* <Route exact path="/login" element={<Login />}></Route> */}
          <Route exact path="/trivia" element={user? <Trivia />: <Login setLoginUser={setLoginUser}/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
