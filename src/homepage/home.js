import React, { useEffect, useId, useState,useContext,createContext } from "react";
import "./home.css";
import axios from "axios";
import Timer from "../components/Timer/Timer";
import Themes from "../components/Themes/Themes";
import MediaPlayer from "../components/MediaPlayer/MediaPlayer";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import Clock from "../components/Clock/Clock";
import SaveIcon from "@mui/icons-material/Save";
import Weather from "../components/Weather";
import { weatherCardStyle } from "../components/Weather";
import { IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { newShade } from "../App";
import Todos from "../components/Todos";
import { set } from "react-hook-form";
import { auth } from "../firebase";

const triviaStyle = {
  fontSize: "30px",
  marginBottom: "20px",
  boxShadow: "2px 2px 2px rgb(52, 51, 51)",
  width: "300px",
  padding: "5px 5px",
  borderRadius: "50px",
  marginTop: "20px",
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

  const [weatherData, setWeatherData] = useState({});
  const getWeather = async () => {
    let res = await axios.get(
      "http://api.weatherstack.com/current?access_key=ccdfa5213d4545b027a0e8345b8d5f90&query=New%20Delhi"
    );
    setWeatherData(res.data);
  };
  useEffect(() => {
    getWeather();
  }, []);

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
        <div>
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
        <div className="todoList">
          <Weather weatherData={weatherData} />
          <Clock />
          <Timer />
          <Todos/>
        </div>
        <MediaPlayer />
        <div style={{ flex: 0.3,marginTop:"0px" }}>
          <div style={{...triviaStyle,backgroundColor:newShade(themes,-30)}}>
            💡Trivia Game
            <IconButton onClick={() => navigate("/trivia")}>
              <Icon icon="material-symbols:play-arrow" />
            </IconButton>
          </div>
          <Themes setThemes={setThemes} />
        </div>
      </div> 
    </div>
    </themeContext.Provider>
  );
}
