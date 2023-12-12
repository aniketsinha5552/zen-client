import React from "react";
import "./login.css";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { buttonClick } from "../assets/functions/clickSound";
import { Icon } from "@iconify/react";
import { provider } from "../firebase";
import { signInWithPopup, updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/reducers/userSlice";

export default function Login() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const loginUser = (data) => {
    buttonClick.play();
    signInWithEmailAndPassword(auth, data.email, data.pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch(
          updateUser({
            email: user.email,
            username: user.displayName,
            id: user.uid,
          })
        );
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const googleSignIn = (e) => {
    signInWithPopup(auth, provider)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        await updateProfile(user, {
          displayName: user.displayName,
        });
        dispatch(
          updateUser({
            email: user.email,
            username: user.displayName,
            id: user.uid,
          })
        );
        reset();
        // navigate('/')

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        console.log(errorCode, errorMessage);
        // ..
      });
    e.preventDefault();
  };

  return (
    <div className="login">
      <h1>
        Zen <Icon className="yinyang" icon="openmoji:yin-yang" />{" "}
        <small style={{ fontWeight: "lighter", fontSize: "20px" }}>
          your virtual study environment
        </small>
      </h1>
      <form onSubmit={handleSubmit(loginUser)}>
        <div id="loginForm">
          <h1 id="loginHead">Sign In</h1>
          <input
            id="username"
            placeholder="Email"
            {...register("email", { required: true })}
          ></input>
          <input
            id="password"
            type="password"
            placeholder="Password"
            {...register("pass", { required: true })}
          ></input>
          <button id="loginBtn" title="Login">
            Login
          </button>
          <button id="googleBtn" onClick={googleSignIn}>
            <Icon
              icon="flat-color-icons:google"
              style={{ marginRight: "5px" }}
            />{" "}
            Google
          </button>
          <span id="registerRedirect">
            Don't have an account?{" "}
            <a
              style={{ textDecoration: "none", color: "#5d5c61" }}
              href="/register"
            >
              Sign Up
            </a>
          </span>
        </div>
      </form>
    </div>
  );
}
