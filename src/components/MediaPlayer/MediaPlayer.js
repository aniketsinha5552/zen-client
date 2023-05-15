import React, { useState, useContext } from "react";
import zen_music from "./zen_music.mp3";
import "./MediaPlayer.css";
import one from "./gifs/cat.gif";
import two from "./gifs/clouds.gif";
import three from "./gifs/coffee.gif";
import four from "./gifs/fish.gif";
import five from "./gifs/leaf-cafe.gif";
import six from "./gifs/lofi.gif";
import seven from "./gifs/rain.gif";
import eight from "./gifs/room.gif";
import nine from "./gifs/table.gif";
import ten from "./gifs/vending.gif";
import trippy from "./gifs/trippy.gif";
import monke from "./gifs/monke.gif";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Icon } from "@iconify/react";
import { IconButton } from "@mui/material";
import { themeContext } from "../../homepage/home";
import { newShade } from "../../App";
import ReactAudioPlayer from "react-audio-player";
import { useRef } from "react";

export default function MediaPlayer() {
  const gifs = [
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
    ten,
    trippy,
    monke,
  ];
  const [currentGif, setCurrentGif] = useState(0);
  const [gif, setGif] = useState(gifs[currentGif]);
  const contextData = useContext(themeContext);
  const theme = contextData.themes;

  const navNextGif = () => {
    if (currentGif === gifs.length - 1) {
      setCurrentGif(0);
    } else {
      setCurrentGif(currentGif + 1);
    }
    setGif(gifs[currentGif]);
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
    musicRef.current.currentTime += 60;
  };
  const goBackward = () => {
    musicRef.current.currentTime -= 60;
  };

  return (
    <div className="music">
      <span style={{fontSize:"20px",color:newShade(theme,-60)}}>Lo-Fi Music</span>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
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
      <img
        style={{ boxShadow: `4px 4px 3px ${newShade(theme, -50)}` }}
        src={gif}
      ></img>
      <div style={{display:"grid",placeItems:"center"}}>
      <IconButton
        // id="refreshGif"
        title="Change Image"
        onClick={navNextGif}
        style={{ backgroundColor: newShade(theme, 10), marginTop: "10px" ,width:"40px",height:"40px"}}
      >
        <Icon
          style={{ fontSize: "30px", color: newShade(theme, -90) }}
          icon="ic:baseline-navigate-next"
        />
      </IconButton>
      </div>

      <audio ref={musicRef} src={zen_music} loop></audio>
    </div>
  );
}
