import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import { newShade } from "../App";
import { themeContext } from "../homepage/home";
import { Icon } from "@iconify/react";

// temporary quotes
const quotes = [
  {
    q:"The important thing is not to stop questioning. Curiosity has its own reason for existing.",
    a:"Albert Einstein",
  },
  {
    q:"When you have a dream, you've got to grab it and never let go.",
    a:"Carol Burnett",
  },
  {
    q:"There is nothing impossible to they who will try.",
    a:"Alexander the Great",
  },
  {
    q: "Learning how to be still, to really be still and let life happen—that stillness becomes a radiance.",
    a:"Morgan Freeman",
  },
  {
    q:"Out of the mountain of despair, a stone of hope.",
    a:"Martin Luther King, Jr",
  },
  {
    q:"The important thing is not to stop questioning. Curiosity has its own reason for existing.",
    a:"Albert Einstein",
  },
  {
    q: "If my mind can conceive it, if my heart can believe it, then I can achieve it.",
    a:"Muhammad Ali",
  },
  {
    q:"It is a man’s own mind, not his enemy or foe, that lures him to evil ways.",
    a:"Buddha",
  },
  {
    q:"In separateness lies the world’s greatest misery; in compassion lies the world’s true strength.",
    a:"Buddha",
  },

]

export const Quote = () => {
const contextData = useContext(themeContext);
const themes = contextData.themes;
const [quote, setQuote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);
// const api_url = "https://api.quotable.io/random";
const api_url = "https://zenquotes.io/api/today";

// const getQuote = async (url) => {};

// useEffect(() => {
//   getQuote(api_url);
// }, []);
  return (
    <div id="quotes" style={{borderRadius:"2px",boxShadow: `2px 2px 2px 2px ${newShade(themes,-100)}`}} >
      {quote ?
      <div id="quote" style={{color:newShade(themes,-60)}}>
      <Icon icon="bi:quote" /> {quote.q}  <em style={{color:newShade(themes,-100)}}> {quote.a}</em>
      </div>
      : <></>
}
     
    </div>
  );
};
