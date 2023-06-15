import React, { useContext, useState ,useRef,useEffect} from "react";
import { themeContext } from "../homepage/home";
import { newShade } from "../App";
import { IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import { set, useForm } from "react-hook-form";
import axios from "axios";


const API_KEY= `${process.env.REACT_APP_CHAT_API_KEY}`;

function Chatbot({close,chat,setChat}) {
  const contextData = useContext(themeContext);
  const theme = contextData.themes;
  const modalStyle = {
    // backgroundColor:newShade(theme,-50),
    marginBottom: "10px",
    paddingLeft: "10px",
    paddingRight: "10px",
    borderRadius: "10px",
    overflow: "hidden",
  };
  const inputStyle = {
    width: "430px",
    height: "40px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    backgroundColor: newShade(theme, -10),
    paddingLeft: "10px",
    marginRight: "2px",
  };
  const chatStyle = {
    backgroundColor: newShade(theme, -50),
    borderRadius: "10px",
    height: "350px",
    width: "470px",
    overflowY: "scroll",
    overflowX: "hidden",
    marginBottom: "10px",
    "&::webkitScrollbar": {
      display: "none",
      width: "0px",
    },
    padding: "5px",
    paddingTop: "10px",
    border: `1px solid ${newShade(theme, -60)}`,
  };
  const messageStyle = {
    backgroundColor: newShade(theme, -10),
    borderRadius: "10px",
    padding: "10px",
    marginBottom: "10px",
    width: "fit-content",
    maxWidth: "350px",
  };

  // const [chat, setChat] = useState([{
  //   message:"Hello, I am ZenBot. How can I help you?",
  //   sender:"bot"
  // }]);

  const [isLoading,setIsLoading] = useState(false);


  const { register, handleSubmit, watch, formState: { errors },reset } = useForm();

  const sendMessage = async(message) => {
     reset();
     setChat([...chat,{message:message,sender:"user"}])
     setIsLoading(true);
     
     let res= await fetch("https://api.openai.com/v1/chat/completions",{
         method:"post",
         headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${process.env.REACT_APP_CHAT_API_KEY}`
         },
         body:JSON.stringify({
            model:"gpt-3.5-turbo",
            messages:[{role:"user",content:message}],
            max_tokens:100,
         })
     })
     const data = await res.json();
     setChat([...chat,{message:message,sender:"user"},{message:data.choices[0].message.content,sender:"bot"}])
     setIsLoading(false);
  }

  const onSubmit = (data) => {
    sendMessage(data.message);
  }

  const clearChat = () => {
    setChat([{
      message:"Hello, I am ZenBot. How can I help you?",
      sender:"bot"
    }]);
  }

  return (
    <div style={modalStyle}>
      <h2 style={{ textAlign: "center" }}>🤖 Ask me anything</h2>
      <IconButton onClick={close} style={{position:"absolute",right:"10px",top:"10px"}}><Icon icon="carbon:close" /></IconButton>
      <IconButton onClick={clearChat} style={{position:"absolute",right:"50px",top:"10px"}}><Icon icon="ant-design:clear-outlined" /></IconButton>

      <div id="messageBody" style={chatStyle}>
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
        }}>
        {chat.map((item,idx) => {
          return (
            <div
              key={idx}
              style={{
                ...messageStyle,
                alignSelf: item.sender == "user" ? "flex-end" : "flex-start",
                backgroundColor:
                  item.sender == "user"
                    ? `${newShade(theme, 0)}`
                    : `${newShade(theme, -20)}`,
              }}
            >
              {item.message}
            </div>
          );
        })}
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} style={{display:"flex",flexDirection:"row"}}>
      <input type="text" placeholder="Type here" style={inputStyle} {...register("message",{required:true})}/>
      <IconButton disabled={isLoading} type="submit">{isLoading ?<Icon icon="line-md:loading-twotone-loop" /> : <Icon icon="basil:send-solid" />}</IconButton>

      </form>
    </div>
  );
}

export default Chatbot;
