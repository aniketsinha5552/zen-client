import React, { useState, useContext, useEffect } from "react";
import "./MediaPlayer.css";
import cat from "./gifs/cat.gif";
import cat_sm from "./gifs/small/cat.jpg";
import clouds from "./gifs/clouds.gif";
import clouds_sm from "./gifs/small/clouds.jpg";
import coffee from "./gifs/coffee.gif";
import coffee_sm from "./gifs/small/coffee.jpg";
import fish from "./gifs/fish.gif";
import fish_sm from "./gifs/small/fish.jpg";
import leafCafe from "./gifs/leaf-cafe.gif";
import leafCafe_sm from "./gifs/small/leaf-cafe.jpg";
import lofi from "./gifs/lofi.gif";
import lofi_sm from "./gifs/small/lofi.jpg";
import rain from "./gifs/rain.gif";
import rain_sm from "./gifs/small/rain.jpg";
import room from "./gifs/room.gif";
import room_sm from "./gifs/small/room.jpg";
import table from "./gifs/table.gif";
import table_sm from "./gifs/small/table.jpg";
import vending from "./gifs/vending.gif";
import vending_sm from "./gifs/small/vending.jpg";
import trippy from "./gifs/trippy.gif";
import trippy_sm from "./gifs/small/trippy.jpg";
import monke from "./gifs/monke.gif";
import monke_sm from "./gifs/small/monke.jpg";

import { Icon } from "@iconify/react";
import { Box, Dialog, IconButton, Typography } from "@mui/material";
import { themeContext } from "../../homepage/home";
import { buttonClick } from "../../assets/functions/clickSound";
import ReactPlayer from "react-player";
import VolumeSlider from "../ambientSounds/Slider";
import Playlist from "./Playlist";

// image imports
const gifs = [cat,rain,clouds,coffee,fish,leafCafe,lofi,room,table,trippy, monke,vending];
const smallGifs = [cat_sm,rain_sm,clouds_sm,coffee_sm,fish_sm,leafCafe_sm,lofi_sm,room_sm,table_sm,trippy_sm, monke_sm,vending_sm];

export default function MediaPlayer() {

  // const [currentGif, setCurrentGif] = useState(0);
  const [gif, setGif] = useState(cat);
  const [smallGif, setSmallGif] = useState(cat_sm);
  const contextData = useContext(themeContext);
  const theme = contextData.themes;

  const showImage=()=>{
    const img= document.getElementById("gif")
    img.style.visibility = "visible"
  }
  useEffect(()=>{
    const img= document.getElementById("gif")
    if(img.complete){
      showImage()
    }else{
      img.style.visibility = "hidden"
    }
  },[gif])

  const navNextGif = () => {
    const currentGif = gifs.indexOf(gif);
    if (currentGif === gifs.length - 1) {
      setSmallGif(smallGifs[0])
      setGif(gifs[0]);
    } else {
      setSmallGif(smallGifs[currentGif + 1])
      setGif(gifs[currentGif + 1]);
    }
  };
  const navPrevGif = () => {
    const currentGif = gifs.indexOf(gif);
    if (currentGif === 0) {
      setSmallGif(smallGifs[gifs.length - 1]);
      setGif(gifs[gifs.length - 1]);
    } else {
      setSmallGif(smallGifs[currentGif - 1]);
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
          <IconButton onClick={()=>setOpenDialog(true)} id="playlist-toggle">
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
      <div className="gif-blur" style={{backgroundImage: `url(${smallGif})`}}>
        <img id="gif" alt="gif" src={gif} onLoad={showImage} />
      </div>
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
