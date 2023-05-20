import React from 'react'
import ChromeDinoGame from 'react-chrome-dino';
import { IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export default function () {
    const navigate = useNavigate();
  return (
    <div>
         <div className="heading">
        <IconButton sx={{ ml: 2 }} onClick={() => navigate("/")}>
          <Icon icon="material-symbols:arrow-back" />
        </IconButton>
        <h1 style={{ marginRight: "50px",fontWeight:"normal" }}>🦖Chrome Dino</h1>
      </div>
      <ChromeDinoGame />
    </div>
  )
}
