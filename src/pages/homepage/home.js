import React, { useEffect, useState, createContext } from "react";
import "./home.css";
import MediaPlayer from "../../components/MediaPlayer/MediaPlayer";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Clock from "../../components/Clock/Clock";
import Weather from "../../components/weatherCard/Weather";
import { Dialog, IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { newShade } from "../../utils/newShade";
import Todos from "../../components/todos/Todos";
import { auth } from "../../firebase";
import Chatbot from "../../components/chatbot/Chatbot";
import { Quote } from "../../components/Quote";
import SoundPlayers from "../../components/ambientSounds/ambientSounds";
import { buttonClick } from "../../assets/functions/clickSound";
import chatBot from "../../assets/images/chat.png";
import Lottie from "react-lottie";
import animationData from "../../assets/animations/loadAnimation.json";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/reducers/userSlice";
import Themes from "../../components/Themes/Themes";
import { getChatFb } from "../../utils/firebaseActions";
import { setChat } from "../../redux/reducers/chatSlice";

const iconStyle = {
  height: "30px",
  width: "30px",
  textAlign: "center",
  verticalAlign: "middle",
};


export default function Home() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const reduxtheme = useSelector((state) => state.theme.theme);
  const user = useSelector((state) => state.user.user);
  const theme = reduxtheme.color;
  // Load Animation
  const [isLoading, setIsLoading] = useState(false);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(()=>{
    async function getChat(){
      let data = await getChatFb(user)
      dispatch(setChat(data))
    }
    getChat()
 },[])
  // End Load Animation

  const [chatDialogOpen, setChatDialogOpen] = useState(false);
  const onClose = () => {
    buttonClick.play();
    setChatDialogOpen(false);
  };

  const onOpen = () => {
    buttonClick.play();
    setChatDialogOpen(true);
  };


  return (
    <>
      {isLoading ? (
        <Lottie
          options={defaultOptions}
          height={400}
          width={400}
          isStopped={isLoading}
        />
      ) : (
        <div className="home">

          <div className="body">
            <div className="side-column">
              <Clock />
              <Weather />
              <Todos />
            </div>
            <div className="center-column">
              <MediaPlayer />
            </div>
            <div className="side-column">
              {/* <Timer /> */}

              <div
                className="gamesButton"
                style={{ backgroundColor: newShade(theme, 5) }}
                onClick={onOpen}
              >
                <img src={chatBot} style={iconStyle} /> ZenBot
              </div>
              <Dialog open={chatDialogOpen} maxWidth="sm">
                <div
                  id="chat_dialog"
                  style={{ backgroundColor: newShade(theme, 5) }}
                >
                  <Chatbot close={onClose} />
                </div>
              </Dialog>

              <div
                className="gamesButton"
                id="trivia_container"
                style={{ backgroundColor: newShade(theme, 5) }}
                onClick={() => {
                  navigate("/trivia");
                  buttonClick.play();
                }}
              >
                💡Trivia
              </div>
              <SoundPlayers />
              <Quote />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
