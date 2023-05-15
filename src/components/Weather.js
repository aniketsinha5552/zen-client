import React, { useContext } from 'react'
import { themeContext } from '../homepage/home'
import { newShade } from '../App'


export let weatherCardStyle={
    fontSize: "30px",
    marginBottom: "20px",
    boxShadow: "2px 2px 2px rgb(52, 51, 51)",
    width: "300px",
    padding: "5px 5px",
    borderRadius: "50px",
    marginTop: "10px",
    textAlign: "center",
    height:"40px",
    display:"grid",
    placeItems:"center"
}
export default function Weather(props) {
  const contextData= useContext(themeContext)
  const theme = contextData.themes
  return (
    <div style={{...weatherCardStyle,backgroundColor:newShade(theme,-30)}}>
        {props.weatherData ?
        <span>{props.weatherData?.current?.weather_descriptions[0]} {props.weatherData?.current?.temperature} C <small><em>feels like {props.weatherData?.current?.feelslike}</em></small></span>
        : <span>loading...</span>
        }
        </div>
  )
}
