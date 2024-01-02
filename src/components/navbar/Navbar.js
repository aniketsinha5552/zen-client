import React, { useState } from "react";
import styles from "./navbar.module.css";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, IconButton } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { buttonClick } from "../../assets/functions/clickSound";
import { updateUser } from "../../redux/reducers/userSlice";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import LofiPlayer from "../lofiPlayer/LofiPlayer";
import { newShade } from "../../utils/newShade";
import { toastify } from "../../utils/toastify";

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const theme = useSelector((state) => state.theme.theme.color);
  const textColor = useSelector((state) => state.theme.theme.text);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open,setOpen]= useState(false)

  const logout = () => {
    buttonClick.play();
    dispatch(updateUser(null));
    auth.signOut();
    navigate("/");
    toastify("success","Logged Out!")
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
        <span className={styles.welcome}>welcome back, {user.username}</span>
        <span>
          <IconButton
            title="logout"
            style={{ color: textColor }}
            onClick={()=>setOpen(true)}
          >
            <ExitToAppIcon />
          </IconButton>
        </span>
      </div>
      <Dialog open={open} onClose={()=>setOpen(false)}>
        <div className={styles.logoutConfirm} style={{backgroundColor: newShade(theme,10)}}>
        <h3 className={styles.confirmText}>
          So long! {user.username}
        </h3>
        <div className={styles.btnContainer}>
        <button className={styles.stayBtn}onClick={()=>setOpen(false)}>Stay</button>
        <button className={styles.leaveBtn} onClick={logout}>Leave</button>
        </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Navbar;
