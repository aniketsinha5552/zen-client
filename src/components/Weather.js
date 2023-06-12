import React, { useContext, useEffect, useState } from "react";
import { themeContext } from "../homepage/home";
import { newShade } from "../App";
import axios from "axios";
import { Icon } from "@iconify/react";

// ab2b6979519f319ec9fbf465af790cb0  --------api_key
// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}   -----Location Co-ordinatesa
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}    ----weather api

export let weatherCardStyle = {
  fontSize: "30px",
  marginBottom: "20px",
  boxShadow: "2px 2px 2px rgb(52, 51, 51)",
  width: "300px",
  padding: "5px 5px",
  borderRadius: "10px",
  marginTop: "10px",
  textAlign: "center",
  height: "180px",
  display: "grid",
};
export default function Weather() {
  const contextData = useContext(themeContext);
  const theme = contextData.themes;
  const [currLoc, setCurrLoc] = useState();
  const [weatherData, setWeatherData] = useState();
  const getWeather = async (lon, lan) => {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lan}&lon=${lon}&appid=ab2b6979519f319ec9fbf465af790cb0&units=metric`
    );
    setWeatherData(res.data);
    console.log(res.data);
  };
  const getLoc = async () => {
    const res = await axios.get("https://ipapi.co/json");
    setCurrLoc(res.data);
    console.log(res.data);
    getWeather(res.data.longitude, res.data.latitude);
  };
  useEffect(() => {
    getLoc();
  }, []);
  return (
    <div style={{ ...weatherCardStyle, backgroundColor: newShade(theme, -30) }}>
      {weatherData ? (
        <>
          <span>
            <div
              style={{
                fontSize: "20px",
                textAlign: "left",
                margin: "5px",
                backgroundColor: newShade(theme, -50),
                width: "fit-content",
                padding: "3px",
                paddingRight:"10px",
                borderRadius: "20px",
              }}
            >
              <Icon
                style={{ verticalAlign: "middle", fontSize: "20px" }}
                icon="mdi:location"
              />{" "}
              {weatherData.name}
            </div>
           
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              style={{ height: "50px" }}
              alt="weather icon"
            />
             <div>{weatherData.main.temp} C</div>
            <div style={{ fontSize: "23px",marginTop:"10px" }}>
              {weatherData.weather[0].description}
            </div>
          </span>
        </>
      ) : (
        <span>loading...</span>
      )}
    </div>
  );
}
