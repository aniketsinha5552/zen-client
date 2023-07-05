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
import context from "react-bootstrap/esm/AccordionContext";
import { Quote } from "../components/Quote";
import SoundPlayers from "../components/ambientSounds/ambientSounds";
import click from "../assets/sounds/click.mp3";

const butonClick = new Audio(click);
butonClick.volume = 0.1;

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
    butonClick.play();
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
          style={{ textAlign: "left", marginTop: "-6px", marginLeft: "30px" }}
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
        <SoundPlayers/>
        </div>
        <div className="side-column">
        
        <Weather />
        <div id="gamesButton" style={{...triviaStyle,backgroundColor:newShade(themes,-30),position:"relative"}} onClick={onOpen} >
             💬ZenBot
          </div>
          <Dialog open={chatDialogOpen}>
              <div style={{ width: "500px", height: "500px",backgroundColor:newShade(themes,-30) }}>
                <Chatbot close={onClose} chat={chat} setChat={setChat}/>
              </div>
          </Dialog>

          <div id="gamesButton" style={{...triviaStyle,backgroundColor:newShade(themes,-30)}} onClick={() => navigate("/trivia")}>
            💡Trivia Game
          </div>
          <Quote/>
        </div>
      </div> 
    </div>
    </themeContext.Provider>
  );
}
