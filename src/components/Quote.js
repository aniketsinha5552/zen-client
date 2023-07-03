import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import { newShade } from "../App";
import { themeContext } from "../homepage/home";

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
    <div id="quotes" >
      <div id="quote" style={{color:newShade(themes,-60), fontSize:"20px"}}>
        {quote.content}  <em>-{quote.author}</em>
      </div>
     
    </div>
  );
};
