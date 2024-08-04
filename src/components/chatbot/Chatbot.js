import React, { useContext, useState, useRef, useEffect } from "react";
import { newShade } from "../../utils/newShade";
import { IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import styles from "./chatbot.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"
import { addChat, deleteChat, setChat } from "../../redux/reducers/chatSlice";
import { addChatFb, getChatFb } from "../../utils/firebaseActions";

function Chatbot({ close }) {
  const reduxtheme = useSelector((state) => state.theme.theme);
  const user = useSelector((state)=>state.user.user)
  const theme = reduxtheme.color;

  const reducerChat = useSelector((state)=>state.chat.chat)
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const sendMessage = async (message) => {
    const userMessage = {message:message, sender: "user",email: user.email}
    await addChatFb(userMessage)
    dispatch(addChat(userMessage))
    reset();
    setIsLoading(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/ask`,{
        question: message
      })
      const botMessage = {message:res.data, sender: "bot",email: user.email}
      await addChatFb(botMessage)
      dispatch(addChat(botMessage))
 
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (data) => {
    sendMessage(data.message);
  };

  const clearChat = () => {
     dispatch(deleteChat())
  };

  return (
    <div className={styles.modalStyle}>
      <h2>🤖 Ask me anything</h2>
      <IconButton
        onClick={close}
        style={{ position: "absolute", right: "10px", top: "10px" }}
      >
        <Icon icon="carbon:close" />
      </IconButton>
      <IconButton
        onClick={clearChat}
        style={{ position: "absolute", right: "50px", top: "10px" }}
      >
        <Icon icon="ant-design:clear-outlined" />
      </IconButton>

      <div
        id="messageBody"
        className={styles.chatStyle}
        style={{ backgroundColor: newShade(theme, -50), color:reduxtheme.text }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          {reducerChat.map((item, idx) => {
            return (
              <div
                key={idx}
                className={styles.messageStyle}
                style={{
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "row" }}
      >
        <input
          type="text"
          placeholder="Type here"
          style={{ backgroundColor: newShade(theme, -10) }}
          className={styles.inputStyle}
          {...register("message", { required: true })}
        />
        <IconButton disabled={isLoading} type="submit">
          {isLoading ? (
            <Icon icon="line-md:loading-twotone-loop" />
          ) : (
            <Icon icon="basil:send-solid" />
          )}
        </IconButton>
      </form>
    </div>
  );
}

export default Chatbot;
