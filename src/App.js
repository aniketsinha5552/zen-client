import React, { useState, createContext, useEffect } from "react";
import Home from "./homepage/home";
import Login from "./login/login";
import SignUp from "./register/SignUp";
import Trivia from "./Trivia";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Footer from "./Footer";

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
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // login user
        setUser({
          email: user.email,
          username: user.displayName,
          id: user.uid,
        });
      }
    });
  }, []);

  const [themes, setThemes] = useState("#d1e8e2");
  return (
    <div className="app" style={{ backgroundColor: `${themes}` }}>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              user ? (
                <Home
                  user={user}
                  setUser={setUser}
                  setThemes={setThemes}
                  themes={themes}
                />
              ) : (
                <Login setUser={setUser} />
              )
            }
          ></Route>
          <Route
            exact
            path="/register"
            element={<SignUp setUser={setUser} />}
          ></Route>
          {/* <Route exact path="/login" element={<Login />}></Route> */}
          <Route
            exact
            path="/trivia"
            element={user ? <Trivia /> : <Login setUser={setUser} />}
          ></Route>
        </Routes>
      </Router>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
