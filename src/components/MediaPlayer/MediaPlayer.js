import React, { useState } from "react";
import zen_music from "./zen_music.mp3";
import './MediaPlayer.css'
import lofi from './lofi.gif'
import one from './gifs/cat.gif'
import two from './gifs/clouds.gif'
import three from './gifs/coffee.gif'
import four from './gifs/fish.gif'
import five from './gifs/leaf-cafe.gif'
import six from './gifs/lofi.gif'
import seven from './gifs/rain.gif'
import eight from './gifs/room.gif'
import nine from './gifs/table.gif'
import ten from './gifs/vending.gif'
import RefreshIcon from '@mui/icons-material/Refresh';

export default function MediaPlayer() {
  const gifs = [one,two,three,four,five,six,seven,eight,nine,ten]
  const [gif, setGif] = useState(gifs[Math.floor(Math.random()*10)])
  return (
    <div className="music">
        
        <img src={gif}></img>
        <button id="refreshGif" title="Change Image" onClick={()=>setGif(gifs[Math.floor(Math.random()*10)])}><RefreshIcon/></button>
        <br/>
        <span>Music 🎵</span>
        <audio src={zen_music} controls></audio>
    </div>
  );
}
