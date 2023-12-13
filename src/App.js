import React, { useState, createContext, useEffect } from "react";
import Home from "./pages/homepage/home"
import Login from "./pages/login/login"
import SignUp from "./pages/register/SignUp";
import Trivia from "./components/trivia/Trivia";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Footer from "./components/Footer";
import Dino from "./components/Dino";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./redux/reducers/userSlice";
import Navbar from "./components/navbar/Navbar";

function App() {
  const reduxtheme = useSelector((state) => state.theme.theme);
  const user = useSelector((state) => state.user.user);
  const theme = reduxtheme.color;
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // login user
        dispatch(
          updateUser({
            email: user.email,
            username: user.displayName,
            id: user.uid,
          })
        );
      }
    });
  }, []);

  return (
    <div className="app" style={{ backgroundColor: `${theme}` }}>
      <Router>
        {user && <Navbar/>}
        <Routes>
          <Route exact path="/" element={user ? <Home /> : <Login />}></Route>
          <Route exact path="/register" element={<SignUp />}></Route>
          {/* <Route exact path="/login" element={<Login />}></Route> */}
          <Route
            exact
            path="/trivia"
            element={user ? <Trivia /> : <Navigate to="/" />}
          ></Route>
          <Route
            exact
            path="/sort"
            element={user ? <Dino /> : <Navigate to="/" />}
          ></Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
