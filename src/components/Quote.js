import React, { useState, useEffect } from "react";
import axios from "axios";
import { newShade } from "../utils/newShade";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";

export const Quote = () => {
  const reduxtheme = useSelector((state) => state.theme.theme);
  const theme = reduxtheme.color;

  const [quote, setQuote] = useState({});

  const getQuote = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/quote`);
      console.log(res.data);
      setQuote(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getQuote();
  }, []);
  return (
    <div
      id="quotes"
      style={{
        borderRadius: "2px",
        boxShadow: `2px 2px 2px 2px ${newShade(theme, -30)}`,
      }}
    >
      {quote ? (
        <div id="quote">
          <Icon icon="bi:quote" /> {quote.q} <Icon icon="iconoir:quote-solid"/>  <em> {quote.a}</em>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
