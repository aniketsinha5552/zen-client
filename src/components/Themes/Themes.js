import React from "react";
import "./Themes.css";
import { Icon } from '@iconify/react';
import { newShade, themeColors, themeNames } from "../../App";
import { TextField, MenuItem } from "@mui/material";

export default function Themes({ setThemes ,theme}) {
  return (
    <div className="themeOut">
      <div className="themes">
       <TextField defaultValue={theme} select placeholder="themes" size="small" label={<Icon style={{fontSize:"20px"}} icon="fa-solid:brush" />} sx={{width:"100px",mb:1,backgroundColor:"transparent"}}>
       {
          themeColors.map((color,index)=>{
            return(
              <MenuItem  key={index} value={color}  onClick={() => setThemes(color)} style={{ backgroundColor: newShade(color,-10),width:"100%",height:"35px",}}>
              <div
               key={index}
              id={index+1}
              onClick={() => setThemes(color)}
              style={{ height:"100%",width:"100%",borderRadius:"50px",display:"grid",placeItems:"center"}}
            >
              
              <span style={{fontSize:"12px",textAlign:"center"}}>{themeNames[index]}</span>
            </div>
            </MenuItem>
            )
          })
}
       </TextField>
      </div>
    </div>
  );
}
