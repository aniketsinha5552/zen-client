import React from "react";
import styles from "./navbar.module.css";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { buttonClick } from "../../assets/functions/clickSound";
import { updateUser } from "../../redux/reducers/userSlice";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import LofiPlayer from "../lofiPlayer/LofiPlayer";

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const theme = useSelector((state) => state.theme.theme.color);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    buttonClick.play();
    dispatch(updateUser(null));
    auth.signOut();
    navigate("/");
  };

  return (
    <div className={styles.navbar}>
      <h1 className={styles.logo}>
        Zen <Icon className="yinyang" icon="openmoji:yin-yang" />{" "}
        <small id="subhead" className={styles.subhead} >
          your virtual study environment
        </small>
      </h1>
      <LofiPlayer/>
      <div className={styles.logout}>
        <span>welcome back, {user.username}</span>
        <span>
          <IconButton
            title="logout"
            style={{ backgroundColor: { theme } }}
            onClick={logout}
          >
            <ExitToAppIcon />
          </IconButton>
        </span>
      </div>
    </div>
  );
};

export default Navbar;
