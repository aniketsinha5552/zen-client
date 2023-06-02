import React, { useState, useContext, useEffect } from "react";
import zen_music from "./zen_music.mp3";
import "./MediaPlayer.css";
import cat from "./gifs/cat.gif";
import clouds from "./gifs/clouds.gif";
import coffee from "./gifs/coffee.gif";
import fish from "./gifs/fish.gif";
import leafCafe from "./gifs/leaf-cafe.gif";
import lofi from "./gifs/lofi.gif";
import rain from "./gifs/rain.gif";
import room from "./gifs/room.gif";
import table from "./gifs/table.gif";
import vending from "./gifs/vending.gif";
import trippy from "./gifs/trippy.gif";
import monke from "./gifs/monke.gif";
import { Icon } from "@iconify/react";
import { IconButton } from "@mui/material";
import { themeContext } from "../../homepage/home";
import { newShade } from "../../App";
import { useRef } from "react";

export default function MediaPlayer() {
  const gifs = [
    rain,
    clouds,
    coffee,
    fish,
    leafCafe,
    lofi,
    cat,
    room,
    table,
    vending,
    trippy,
    monke,
  ];
  // const [currentGif, setCurrentGif] = useState(0);
  const [gif, setGif] = useState(gifs[Math.floor(Math.random() * gifs.length)]);
  const contextData = useContext(themeContext);
  const theme = contextData.themes;

  const navNextGif = () => {
    const currentGif = gifs.indexOf(gif);   
    if (currentGif === gifs.length - 1) {
      setGif(gifs[0]);
    } else {
      setGif(gifs[currentGif+1]);
    }
   
  };

  const [play, setPlay] = useState(false);
  const musicRef = useRef(null);

  const togglePlay = () => {
    if (play) {
      musicRef.current.pause();
      setPlay(false);
    } else {
      musicRef.current.play();
      setPlay(true);
    }
  };

  const goForward = () => {
    musicRef.current.currentTime += 120;
  };
  const goBackward = () => {
    musicRef.current.currentTime -= 120;
  };

  return (
    <div className="music">
      <span style={{fontSize:"20px",color:newShade(theme,-80)}}>Lo-Fi Music</span>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        {/* Music Player */}
        <IconButton onClick={goBackward}>
          <Icon icon="material-symbols:skip-previous-rounded" />
        </IconButton>
        {!play ? (
          <IconButton onClick={togglePlay}>
            <Icon icon="material-symbols:play-arrow-rounded" />
          </IconButton>
        ) : (
          <IconButton onClick={togglePlay}>
            <Icon icon="material-symbols:pause-rounded" />
          </IconButton>
        )}
        <IconButton onClick={goForward}>
          <Icon icon="material-symbols:skip-next-rounded" />
        </IconButton>
      </div>
      {/* Gif */}
      <img
        style={{ boxShadow: `0px 0px 10px 0px #5A5A5A` }}
        src={gif}
      ></img>
      <div style={{display:"grid",placeItems:"center"}}>
      <IconButton
        // id="refreshGif"
        title="Next Image"
        onClick={navNextGif}
        style={{ backgroundColor: newShade(theme, 10), marginTop: "10px" ,width:"40px",height:"40px"}}
      >
        <Icon
          style={{ fontSize: "30px", color: "#5A5A5A" }}
          icon="ic:baseline-navigate-next"
        />
      </IconButton>
      </div>

      <audio ref={musicRef} src={zen_music} loop></audio>
    </div>
  );
}
