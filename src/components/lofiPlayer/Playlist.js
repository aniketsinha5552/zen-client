import React, { useState } from "react";
import { Box, Typography, IconButton, TextField, Button } from "@mui/material";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { newShade } from "../../utils/newShade";
import { toastify } from "../../utils/toastify";
import styles from "./LofiPlayer.module.css";

const Playlist = ({ theme, playlist, setPlaylist, setCurrentPlaylist }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const removeSong = (song) => {
    if (playlist.length === 1) {
      toastify(null, "You can't remove the last song from the playlist");
    } else {
      setPlaylist(playlist.filter((item) => item.title !== song.title));
    }
  };
  const [link, setLink] = useState("");
  const handleLinkChange = (e, val) => {
    setLink(val);
  };

  const addToPlaylist = async (data) => {
    const url = data.url;
    if (!url) {
      toastify("error", "Please add a valid youtube URL");
      return;
    }
    // Fetch title of youtube video
    try {
      const response = await fetch(
        `https://www.youtube.com/oembed?url=${url}&format=json`
      );
      const data = await response.json();
      const title = data.title;
      const song = {
        url: url,
        title: title,
        img: data.thumbnail_url,
        author: data?.author_name,
      };
      setPlaylist([...playlist, song]);
      toastify("success", "Playlist updated!");
    } catch (error) {
      toastify("error", "Please add a valid youtube URL");
      return;
    }
    reset();
  };

  const changeSong=(e,song)=>{
       setCurrentPlaylist(song);
       e.stopPropagation();     
  }

  return (
    <Box sx={{ backgroundColor: theme.color }} className={styles.playlist}>
      <Typography
        variant="h6"
        style={{ textAlign: "center", marginBottom: "10px", color: theme.text }}
      >
        Playlist 🎵
      </Typography>
      <form onSubmit={handleSubmit(addToPlaylist)}>
        <input
          className={styles.input_song}
          placeholder="paste youtube link here"
          variant="outlined"
          size="small"
          fullWidth
          {...register("url", { required: true })}
        />
        <button className={styles.add_song} type="submit">
          +
        </button>
      </form>

      <Box className={styles.songsContainer}>
        {playlist.map((song, index) => {
          return (
            <Box
              onClick= {(e)=>changeSong(e,song)}
              key={index}
              className={styles.songContainer}
              style={{ backgroundColor: newShade(theme.color, -50) }}
            >
              <img src={song.img} alt="thumbnail" className={styles.songImg} />
              <Typography
                variant="body1"
                onClick={() => setCurrentPlaylist(song)}
                className={styles.songTitle}
                sx={{ color: theme.text }}
              >
                {song.title.slice(0, 50)}
                {song.title.length > 50 ? "..." : ""}
              </Typography>
              <em style={{color: theme.text }}>~ {song.author.slice(0,20)}</em>
              <IconButton
                onClick={() => removeSong(song)}
                className={styles.songAdd}
              >
                <Icon
                  icon="fluent:delete-24-filled"
                  style={{ fontSize: "20px", color: theme.text }}
                />
              </IconButton>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Playlist;
