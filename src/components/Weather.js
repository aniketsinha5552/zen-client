import React from 'react'


export const weatherCardStyle={
    fontSize: "30px",
    marginLeft: "30px",
    boxShadow: "2px 2px 2px black",
    width: "fit-content",
    padding: "5px 5px",
    borderRadius: "5px",
    marginTop: "10px",
}
export default function Weather(props) {
  return (
    <div style={weatherCardStyle}>
        {props.weatherData ?
        <span>{props.weatherData?.current?.weather_descriptions[0]} {props.weatherData?.current?.temperature} C <small><em>feels like {props.weatherData?.current?.feelslike}</em></small></span>
        : <span>loading...</span>
        }
        </div>
  )
}
