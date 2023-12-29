import React, { useState } from 'react'
import styles from "./LofiPlayer.module.css"
import { buttonClick } from '../../assets/functions/clickSound';
import { Box, Dialog, IconButton } from '@mui/material';
import { Icon } from '@iconify/react';
import VolumeSlider from '../ambientSounds/Slider';
import ReactPlayer from 'react-player';
import Playlist from './Playlist';
import { useSelector } from 'react-redux';

const LofiPlayer = () => {
    const theme= useSelector((state)=>state?.theme?.theme?.color) 
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
    <div className={styles.music_player} >
        <p className={styles.title}>{currentPlayist.title} 🎵</p>
        <p className={styles.musicLogo}>🎵</p>
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
          <IconButton onClick={nextTrack} className={styles.playlistBtn}>
          <Icon icon="fluent:next-32-regular" style={{ fontSize: "25px" }}/>
          </IconButton>
          <IconButton onClick={()=>setOpenDialog(true)} id="playlist-toggle">
          <Icon icon="ph:list-bold" style={{ fontSize: "25px" }}/>
          </IconButton>
          <Box sx={{display:"grid",placeItems:"center",position:"absolute",right:10,height:"100%"}} className={styles.slider}>
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
  )
}

export default LofiPlayer