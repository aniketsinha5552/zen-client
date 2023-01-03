import React from "react";
import "./Themes.css";

export default function Themes({ setThemes }) {
  return (
    <div className="themeOut">
      <h3 style={{textAlign:"left"}}>Themes</h3>
      <div className="themes">
        <button
          id="1"
          onClick={() => setThemes("#afd275")}
          style={{ backgroundColor: "#afd275" }}
        ></button>
        <button
          id="2"
          onClick={() => setThemes("#edf5e1")}
          style={{ backgroundColor: "#edf5e1" }}
        ></button>
        <button
          id="3"
          onClick={() => setThemes("#e98078")}
          style={{ backgroundColor: "#e98078" }}
        ></button>
        <button
          id="4"
          onClick={() => setThemes("#ffcb9a")}
          style={{ backgroundColor: "#ffcb9a" }}
        ></button>
        <button
          id="5"
          onClick={() => setThemes("#d1e8e2")}
          style={{ backgroundColor: "#d1e8e2" }}
        ></button>
        <button
          id="6"
          onClick={() => setThemes("#9d8d8f")}
          style={{ backgroundColor: "#9d8d8f" }}
        ></button>
        <button
          id="7"
          onClick={() => setThemes("#659dbd")}
          style={{ backgroundColor: "#659dbd" }}
        ></button>
        <button
          id="8"
          onClick={() => setThemes("#379683")}
          style={{ backgroundColor: "#379683" }}
        ></button>
        <button
          id="9"
          onClick={() => setThemes("#83677b")}
          style={{ backgroundColor: "#83677b" }}
        ></button>
      </div>
    </div>
  );
}
