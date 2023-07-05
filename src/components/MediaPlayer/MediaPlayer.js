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
import { LazyLoadImage } from "react-lazy-load-image-component";

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
  const navPrevGif = () => {
    const currentGif = gifs.indexOf(gif);   
    if (currentGif === 0) {
      setGif(gifs[gifs.length - 1]);
    } else {
      setGif(gifs[currentGif-1]);
    }
   
  }

  useEffect(() => {
    const interval = setInterval(() => {
      navNextGif();
    }, 10000);
    return () => clearInterval(interval);
  }, [gif]);

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
    musicRef.current.currentTime += 180;
  };
  const goAlotForward = () => {
    musicRef.current.currentTime += 300;
  }
  const goBackward = () => {
    musicRef.current.currentTime -= 180;
  };
  const goAlotBackward = () => {
    musicRef.current.currentTime -= 300;
  }

  const [musicVolume, setMusicVolume] = useState(0.2);
  const volumeUp = () => {
    if (musicVolume < 1) {
      setMusicVolume(musicVolume + 0.1);
      musicRef.current.volume = musicVolume;
    }
  }
  const volumeDown = () => {
    if (musicVolume > 0) {
      setMusicVolume(musicVolume - 0.1);
      musicRef.current.volume = musicVolume;
    }
  }

  return (
    <div className="music">
    
      {/* Gif */}
      <div style={{display:"flex" ,justifyContent:"center",justifyContent:"center",alignItems:"center"}}>
      <IconButton onClick={navPrevGif}  style={{ marginTop: "10px" ,width:"40px",height:"40px"}}>
        <Icon icon="ic:baseline-navigate-before"  style={{ fontSize: "30px" }}/>
      </IconButton>
      <LazyLoadImage
        id="gif"
        alt="gif"
        style={{ boxShadow: `0px 0px 10px 0px #5A5A5A`,minWidth:"400px"}}
        src={gif}
        effect="blur"
      ></LazyLoadImage>
         <IconButton
        title="Next Image"
        onClick={navNextGif}
        style={{ marginTop: "10px" ,width:"40px",height:"40px"}}
      >
        <Icon
          style={{ fontSize: "30px" }}
          icon="ic:baseline-navigate-next"
        />
      </IconButton>
      </div>
     

      <span style={{fontSize:"20px",color:newShade(theme,-80),marginTop:"10px"}}>Lo-Fi Music</span>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: "20px",
          position: "relative",
        }}
      >
        {/* Music Player */}
        {/* <IconButton onClick={goAlotBackward}>
        <Icon icon="ic:round-fast-rewind" />
        </IconButton> */}
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
        {/* <IconButton onClick={goAlotForward}>
        <Icon icon="ic:round-fast-forward" />
        </IconButton> */}
        <div style={{position:"absolute",right:50}}>
        <IconButton>
        <Icon icon="formkit:volumedown" onClick={volumeDown} style={{fontSize:"20px"}} />
        </IconButton>
        <IconButton>
        <Icon icon="formkit:volumeup" onClick={volumeUp} style={{fontSize:"20px"}} />
        </IconButton>
        </div>
        
      </div>

      <audio ref={musicRef} src={zen_music} loop></audio>
    </div>
  );
}
