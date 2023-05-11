import React, { useEffect, useId, useState } from "react";
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

export default function Home({ user, setLoginUser, setThemes }) {
  const [todo, setTodo] = useState(user.todo);
  const todoList = todo.map((item, index) => {
    return (
      <ul key={index}>
        <li>
          {item}{" "}
          <button
            title="Task Completed"
            id="addTodo"
            onClick={() => removeItem(item)}
          >
            <DoneIcon />
          </button>
        </li>
      </ul>
    );
  });
  const [todoItems, setTodoItems] = useState("");

  function removeItem(item) {
    const itemIndex = todo.indexOf(item);
    console.log(itemIndex);
    setTodo([
      ...todo.slice(0, itemIndex),
      ...todo.slice(itemIndex + 1, todo.length),
    ]);
  }

  function updateTodo() {
    setTodo((prev) => [...prev, todoItems]);
    const input = document.getElementById("todoInput");
    input.value = null;
  }

  function saveList() {
    const { username, email, password } = user;

    axios
      .post("http://localhost:5000/update", {
        username,
        email,
        password,
        todo: todo,
      })
      .then((res) => {
        alert("List saved");
      });
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
    <div className="home">
      <h1 style={{ textAlign: "center", marginTop: "-10px" }}>Zen ☯️</h1>

      <div className="heading">
        <span>welcome back, {user.username}</span>
        <span>
          <button title="logout" onClick={() => setLoginUser({})}>
            <ExitToAppIcon />
          </button>
        </span>
      </div>

      <Weather weatherData={weatherData} />
      <Clock />
      <div className="body">
        <div className="todoList">
          <Timer />

          <h3 style={{ marginTop: "35px" }}>To-do List</h3>
          <input
            placeholder="Add an item"
            id="todoInput"
            onChange={(e) => setTodoItems(e.target.value)}
            style={{ width: "15rem", height: "20px" }}
          ></input>
          <button title="Add Item" onClick={updateTodo}>
            <AddIcon />
          </button>
          <button title="Save List" onClick={saveList}>
            <SaveIcon />
          </button>
          <br />
          {todoList}
        </div>
        <MediaPlayer />
        <div style={{flex:0.3}}>
          <div style={weatherCardStyle}>
            💡Trivia Game
            <IconButton>
              <Icon icon="material-symbols:play-arrow" />
            </IconButton>
          </div>
          <Themes setThemes={setThemes} />
        </div>
      </div>
      <footer className="footer">
        <span>
          This app was created by{" "}
          <span style={{ color: "#05386b" }}>Aniket Sinha</span>
        </span>
      </footer>
    </div>
  );
}
