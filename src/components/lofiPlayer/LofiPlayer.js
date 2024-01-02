import React, { useState } from "react";
import styles from "./LofiPlayer.module.css";
import { buttonClick } from "../../assets/functions/clickSound";
import { Box, Dialog, IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import VolumeSlider from "../ambientSounds/Slider";
import ReactPlayer from "react-player";
import Playlist from "./Playlist";
import { useSelector } from "react-redux";
import { playlistSongs } from "../../constants/playlistSongs";

const LofiPlayer = () => {
  const theme = useSelector((state) => state?.theme?.theme);
  const [play, setPlay] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.2);
  const [playlist, setPlaylist] = useState(playlistSongs);

  const [currentPlayist, setCurrentPlaylist] = useState(playlist[0]);

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
  };

  const handleVolumeChange = (newValue) => {
    setMusicVolume(newValue);
  };

  const [openDialog, setOpenDialog] = useState(false);
  return (
    <div className={styles.music_player}>
      <p className={styles.title}>{currentPlayist.title} 🎵</p>
      <p className={styles.musicLogo}>🎵</p>
      <Box className={styles.btnContainer}>
        {!play ? (
          <IconButton onClick={togglePlay}>
            <Icon icon="akar-icons:play" style={{ fontSize: "25px", color: theme.text  }} />
          </IconButton>
        ) : (
          <IconButton onClick={togglePlay}>
            <Icon icon="akar-icons:pause" style={{ fontSize: "25px", color: theme.text }} />
          </IconButton>
        )}
        <IconButton onClick={nextTrack} className={styles.playlistBtn}>
          <Icon icon="fluent:next-32-regular" style={{ fontSize: "25px",color: theme.text }} />
        </IconButton>
        <IconButton onClick={() => setOpenDialog(true)} id="playlist-toggle">
          <Icon icon="ph:list-bold" style={{ fontSize: "25px",color: theme.text }} />
        </IconButton>
        <Box className={styles.slider}>
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
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <Playlist
          theme={theme}
          playlist={playlist}
          setPlaylist={setPlaylist}
          setCurrentPlaylist={setCurrentPlaylist}
        />
      </Dialog>
    </div>
  );
};

export default LofiPlayer;
