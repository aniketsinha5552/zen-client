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
import { Box, Dialog, IconButton, Typography } from "@mui/material";
import { themeContext } from "../../homepage/home";
import { newShade } from "../../App";
import { useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { buttonClick } from "../../assets/functions/clickSound";
import ReactPlayer from "react-player";
import VolumeSlider from "../ambientSounds/Slider";
import Playlist from "./Playlist";

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
      setGif(gifs[currentGif + 1]);
    }
  };
  const navPrevGif = () => {
    const currentGif = gifs.indexOf(gif);
    if (currentGif === 0) {
      setGif(gifs[gifs.length - 1]);
    } else {
      setGif(gifs[currentGif - 1]);
    }
  };

  const [play, setPlay] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.2);
  const [playlist, setPlaylist] = useState([
    {url:"https://www.youtube.com/watch?v=jfKfPfyJRdk",title:"lofi hip hop radio - beats to relax/study to"},
  ])

  const [currentPlayist,setCurrentPlaylist] = useState(playlist[0]);

  const togglePlay = () => {
    buttonClick.play();
    setPlay(!play);
  };
  const nextTrack = () => {
    const currentSong = playlist.indexOf(currentPlayist);
    if (currentSong === playlist.length - 1) {
      setCurrentPlaylist(playlist[0]);
    } else {
      setCurrentPlaylist(playlist[currentSong + 1]);
    }
  }

  const handleVolumeChange = (newValue) => {
    setMusicVolume(newValue);
  }

  const [openDialog, setOpenDialog] = useState(false);


  return (
    <div className="music">
      
      <div className="music-player" >
        <p style={{fontSize: "20px",textAlign: "center",marginTop:"5px",marginBottom:"5px"}}>{currentPlayist.title} 🎵</p>
        <Box sx={{display:"flex",justifyContent:"center",position:"relative",width:"80%",margin:"0 auto"}}>
          {!play?(
              <IconButton onClick={togglePlay}>
                <Icon icon="akar-icons:play" style={{ fontSize: "25px" }} />
              </IconButton>
          ):(
            <IconButton onClick={togglePlay}>
            <Icon icon="akar-icons:pause" style={{ fontSize: "25px" }} />
          </IconButton>
          )}
          <IconButton onClick={nextTrack}>
          <Icon icon="fluent:next-32-regular" style={{ fontSize: "25px" }}/>
          </IconButton>
          <IconButton onClick={()=>setOpenDialog(true)}>
          <Icon icon="ph:list-bold" style={{ fontSize: "25px" }}/>
          </IconButton>
          <Box sx={{display:"grid",placeItems:"center",position:"absolute",right:10,height:"100%"}}>
          <VolumeSlider
            value={musicVolume}
            min={0}
            max={1}
            step={0.1}
            onChange={handleVolumeChange}
            isVertical={false}
          />
          </Box>

            <ReactPlayer 
              url={currentPlayist.url}
              playing={play}
              volume={musicVolume}
              width="0px"
              height="0px"
            />
        </Box>
        <Dialog open={openDialog} onClose={()=>setOpenDialog(false)}>
           <Playlist theme={theme} playlist={playlist} setPlaylist={setPlaylist} setCurrentPlaylist={setCurrentPlaylist}/>
        </Dialog>
      </div>

      {/* Gif */}
      <LazyLoadImage
        id="gif"
        alt="gif"
        style={{ boxShadow: `0px 0px 10px 0px #5A5A5A` }}
        src={gif}
        effect="blur"
      ></LazyLoadImage>
      <div style={{display:"flex",justifyContent:"center"}}>
      <IconButton
        onClick={navPrevGif}
        style={{ marginTop: "10px", width: "40px", height: "40px" }}
      >
        <Icon icon="ic:baseline-navigate-before" style={{ fontSize: "30px" }} />
      </IconButton>
      <IconButton
        title="Next Image"
        onClick={navNextGif}
        style={{ marginTop: "10px", width: "40px", height: "40px" }}
      >
        <Icon style={{ fontSize: "30px" }} icon="ic:baseline-navigate-next" />
      </IconButton>
      </div>

      {/* <audio ref={musicRef} src={zen_music} loop></audio> */}


    </div>
  );
}
