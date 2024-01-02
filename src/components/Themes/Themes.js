import React from "react";
import "./Themes.css";
import { Icon } from '@iconify/react';
import { newShade} from "../../utils/newShade";
import { TextField, MenuItem } from "@mui/material";
import { themes as allThemes } from "../../constants/themes";
import { useDispatch, useSelector } from "react-redux";
import { changeThemeById } from "../../redux/reducers/themeSlice";
import { saveTheme } from "../../redux/reducers/userSlice";

export default function Themes() {
  const theme= useSelector((state)=>state.theme.theme)
  // const theme = reduxtheme.color
  const dispatch = useDispatch()

  const changeTheme=(id)=>{
      dispatch(changeThemeById(id));
      dispatch(saveTheme(id));
  }
  return (
    <div className="themeOut">
      <div className="themes">
       <TextField defaultValue={theme.id} select placeholder="themes" size="small" label={<Icon style={{fontSize:"20px"}} icon="fa-solid:brush" />} sx={{width:"100px",mb:1,backgroundColor:"transparent", color:theme.text}}>
       {
          allThemes.map((item)=>{
            return(
              <MenuItem  key={item.id} value={item.id}  onClick={() => changeTheme(item.id)} style={{ backgroundColor: newShade(item.color,-10),width:"100%",height:"35px",color:item.text}}>
              <div
               id={item.id}
              style={{ height:"100%",width:"100%",borderRadius:"50px",display:"grid",placeItems:"center"}}
            >
              
              <span style={{fontSize:"12px",textAlign:"center"}}>{item.name}</span>
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
