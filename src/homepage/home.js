import React, { useEffect, useId, useState,useContext,createContext } from "react";
import "./home.css";
import axios from "axios";
import Timer from "../components/Timer/Timer";
import MediaPlayer from "../components/MediaPlayer/MediaPlayer";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Clock from "../components/Clock/Clock";
import Weather from "../components/Weather";
import { Dialog, DialogTitle, IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { newShade } from "../App";
import Todos from "../components/Todos";
import { auth } from "../firebase";
import Chatbot from "../components/Chatbot";


const triviaStyle = {
  fontSize: "30px",
  marginBottom: "20px",
  boxShadow: "2px 2px 2px rgb(52, 51, 51)",
  width: "300px",
  padding: "5px 5px",
  borderRadius: "50px",
  marginTop: "10px",
  textAlign: "center",
  height:"40px",

}

export const themeContext = createContext()

export default function Home({ user, setUser, setThemes, themes }) {
  const navigate = useNavigate();


  const logout = () => {
    setUser(null);
    auth.signOut();
    navigate("/");
  }

  const [chatDialogOpen, setChatDialogOpen] = useState(false);
  const onClose = () => setChatDialogOpen(false);
  const onOpen = () => setChatDialogOpen(true);
  const [chat, setChat] = useState([{
    message:"Hello, I am ZenBot. How can I help you?",
    sender:"bot"
  }]);

  return (
    <themeContext.Provider value={{user,themes,setThemes}}>
    <div className="home">
      <div className="heading">
        <h1
          style={{ textAlign: "left", marginTop: "-10px", marginLeft: "30px" }}
        >
          Zen ☯️{" "}
          <small style={{ fontWeight: "lighter", fontSize: "20px" }}>
            your virtual study environment
          </small>
        </h1>
        <div style={{fontSize:"20px"}}>
          <span>welcome back, {user.username}</span>
          <span>
            <IconButton
              title="logout"
              style={{ backgroundColor: { themes } }}
              onClick={logout}
            >
              <ExitToAppIcon />
            </IconButton>
          </span>
        </div>
      </div>

      <div className="body">
        <div className="side-column">
          <Clock />
          <Timer />
          <Todos/>
        </div>
        <div className="center-column">
        <MediaPlayer />
        </div>
        <div className="side-column">
        <Weather />
          <div style={{...triviaStyle,backgroundColor:newShade(themes,-30)}}>
            💡Trivia Game
            <IconButton onClick={() => navigate("/trivia")}>
              <Icon icon="material-symbols:play-arrow" />
            </IconButton>
          </div>
          <div style={{...triviaStyle,backgroundColor:newShade(themes,-30)}}>
             Sorting Visualizer
            <IconButton onClick={() => navigate("/sort")}>
              <Icon icon="material-symbols:play-arrow" />
            </IconButton>
          </div>
          <div style={{...triviaStyle,backgroundColor:newShade(themes,-30)}}>
             💬ZenBot
            <IconButton onClick={onOpen}>
              <Icon icon="material-symbols:play-arrow" />
            </IconButton>
            <Dialog open={chatDialogOpen}>
              <div style={{ width: "500px", height: "500px",backgroundColor:newShade(themes,-30) }}>
                <Chatbot close={onClose} chat={chat} setChat={setChat}/>
              </div>
            </Dialog>
          </div>
          {/* <Themes setThemes={setThemes} /> */}
        </div>
      </div> 
    </div>
    </themeContext.Provider>
  );
}
