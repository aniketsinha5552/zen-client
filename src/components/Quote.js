import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import { newShade } from "../App";
import { themeContext } from "../homepage/home";
import { Icon } from "@iconify/react";

export const Quote = () => {
const contextData = useContext(themeContext);
const themes = contextData.themes;
const [quote, setQuote] = useState("");
const api_url = "https://api.quotable.io/random";

const getQuote = async (url) => {
    const response = await axios.get(url);
    const data = response.data;
    setQuote(data);
};

useEffect(() => {
  getQuote(api_url);
}, []);
  return (
    <div id="quotes" style={{borderRadius:"2px",boxShadow: `2px 2px 2px 2px ${newShade(themes,-100)}`}} >
      {quote ?
      <div id="quote" style={{color:newShade(themes,-60), fontSize:"22px",}}>
      <Icon icon="bi:quote" /> {quote.content}  <em style={{color:newShade(themes,-100)}}> {quote.author}</em>
      </div>
      : <></>
}
     
    </div>
  );
};
