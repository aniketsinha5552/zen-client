import React from "react";
import "./Themes.css";
import { Icon } from '@iconify/react';
import { themeColors } from "../../App";

export default function Themes({ setThemes }) {
  return (
    <div className="themeOut">
      <h3 style={{textAlign:"left"}}>Themes <Icon icon="fluent:paint-brush-16-regular" /></h3>
      <div className="themes">
        {
          themeColors.map((color,index)=>{
            return(
              <button
               key={index}
              id={index+1}
              onClick={() => setThemes(color)}
              style={{ backgroundColor: color}}
            ></button>
            )
          })
}
      </div>
    </div>
  );
}
