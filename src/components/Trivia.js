import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { newShade } from "../App";

function Trivia({theme}) {
  const navigate = useNavigate();
  const [curQues, setCurQues] = useState(0);
  const [triviaData, setTriviaData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const getTriviaData = async (url) => {
    setIsLoading(true);
    try {
      const res = await axios.get(url);
      console.log(res.data.results);
      setTriviaData(res.data.results);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const [questions, setQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState("any");
  const [category, setCategory] = useState(0);
  const [categories, setCategories] = useState(null);

  const getCategory = async () => {
    let res = await axios.get("https://opentdb.com/api_category.php");
    console.log(res.data.trivia_categories);
    setCategories(res.data.trivia_categories);
  };

  useEffect(() => {
    getCategory();
  }, []);

  const nextQuestion = () => {
    if (curQues < questions-1) {
      setCurQues(curQues + 1);
    } else {
      setGameOver(true);
    }
  };
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const RenderQuestion = () => {
    const options =
      triviaData &&
      triviaData[curQues]?.incorrect_answers.concat(
        triviaData[curQues]?.correct_answer
      );

    const onOptionSelect = (option) => {
      if (option == triviaData[curQues]?.correct_answer) {
        setScore(score + 1);
      }
      nextQuestion();
    };

    const renderSymbol = (str) => {
      return (
        `<span>${str}</span>`
      );
    };
    return (
      <>
        <div style={{ fontSize: "25px" }}>
          {triviaData && (
            <>
              Q {curQues + 1}.{" "}
               <span dangerouslySetInnerHTML={{__html: renderSymbol(triviaData[curQues]?.question)}} />  
            </>
          )}
        </div>
        <List sx={{ mt: 2 }}>
          {options?.map((option) => (
            <ListItem
              key={option}
              onClick={() => onOptionSelect(option)}
              sx={{ fontSize: "22px", ml: 3 }}
            >
              <ListItemButton
                sx={{
                  fontWeight: "lighter",
                  background: newShade(theme, 30),
                  borderRadius: "10px",
                  maxWidth: "1000px",
                  height: "45px",
                }}
              >
                {option}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </>
    );
  };

  const restartGame = async () => {
    await getTriviaData();
    setGameOver(false);
    setCurQues(0);
    setScore(0);
  };

  const changeSettings = () => {
    restartGame();
    setGameStarted(false);
  };

  const RenderScore = () => {
    let gif = "";
    if (score > 5) {
      gif =
        "https://media0.giphy.com/media/l0HlMr2G3EKFgpUY0/giphy.gif?cid=ecf05e47m0hzf7ocir30aw27rqhkih797a2w5xq4ixevdmeh&ep=v1_gifs_search&rid=giphy.gif&ct=g";
    } else {
      gif =
        "https://media4.giphy.com/media/l3V0yA9zHe5m29sxW/giphy.gif?cid=ecf05e47m0hzf7ocir30aw27rqhkih797a2w5xq4ixevdmeh&ep=v1_gifs_search&rid=giphy.gif&ct=g";
    }
    return (
      <div style={{ display: "grid", placeItems: "center" }}>
        <img style={{ height: "250px" }} src={gif}></img>
        <h3
          style={{
            textAlign: "center",
            fontWeight: "lighter",
            fontSize: "30px",
          }}
        >
          {" "}
          Game Over! Your score is {score}/{questions}
        </h3>
        <div>
          <IconButton onClick={restartGame} title="restart game">
            <Icon icon="codicon:debug-restart" />
          </IconButton>
          <IconButton onClick={changeSettings} title="change game settings">
            <Icon icon="material-symbols:settings" />
          </IconButton>
        </div>
      </div>
    );
  };

  const StartPage = () => {
    return (
      <div style={{ display: "grid", placeItems: "center" }}>
        <h3
          style={{
            textAlign: "center",
            fontWeight: "lighter",
            fontSize: "30px",
          }}
        >
          Welcome to the Trivia Game
        </h3>
        <div>
          <Stack spacing={3}>
            <TextField
              label="No of Questions"
              sx={{ width: "300px" }}
              select
              value={questions}
              onChange={(e) => setQuestions(e.target.value)}
            >
              <MenuItem value="5">5</MenuItem>
              <MenuItem value="10">10</MenuItem>
              <MenuItem value="15">15</MenuItem>
              <MenuItem value="20">20</MenuItem>
            </TextField>
            <TextField
              label="Category"
              sx={{ width: "300px" }}
              select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value={0}>Any</MenuItem>
              {categories && categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
              ))}
            </TextField>
            <TextField
              label="Difficulty"
              sx={{ width: "300px" }}
              select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
               <MenuItem value="any">Any</MenuItem>
               <MenuItem value="easy">Easy</MenuItem>
               <MenuItem value="medium">Medium</MenuItem>
               <MenuItem value="hard">Hard</MenuItem>
            </TextField>
          </Stack>
        </div>
        <button
          style={{ marginTop: "20px",backgroundColor:newShade(theme,-50),height:"40px",borderRadius:"10px",fontSize:"15px",fontWeight:"lighter",border:"none",color:"white" }}
          onClick={startGame}
          id="startGame"
        >
          Start Game
        </button>
      </div>
    );
  };

  const startGame=()=>{
    const url = `https://opentdb.com/api.php?amount=${questions}&category=${category==0 ? "": category}&difficulty=${difficulty=="any" ? "" : difficulty}`
    getTriviaData(url)
    setGameStarted(true)
  }

  const RenderGame = () => {
    return (
      <div style={{ padding: "10px" ,position:'relative',height: "400px"}}>
        {isLoading ? (
          <p style={{height:"200px"}}>........Loading</p>
        ) : gameOver ? (
          <RenderScore />
        ) : (
          <RenderQuestion />
        )}
        {!gameOver && (
          <div style={{position:"absolute",right:10,bottom:10}}>
          <div style={{textAlign:"right"}}>
            <div
              style={{
                fontSize: "20px",
              }}
            >
              <p> Score : {score} </p>
              <p>No of questions : {questions} </p>
            </div>
            <div>
              <IconButton onClick={restartGame} title="restart game">
                <Icon icon="codicon:debug-restart" />
              </IconButton>
              <IconButton onClick={changeSettings} title="change game settings">
                <Icon icon="material-symbols:settings" />
              </IconButton>
            </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="trivia" style={{ padding: 10 }}>
      <div className="heading">
        <IconButton sx={{ ml: 2 }} onClick={() => navigate("/")}>
          <Icon icon="material-symbols:arrow-back" />
        </IconButton>
        <h1 style={{ marginRight: "50px", fontWeight: "normal" }}>
          💡Trivia Game
        </h1>
      </div>
      <h2
        style={{
          textAlign: "center",
          fontWeight: "lighter",
          marginBottom: "10px",
          marginTop: "-50px",
          padding: "5px",
        }}
      >
        Test out your knowledge!
      </h2>
      <div
        style={{
          padding: 10,
          margin: "20px",
          backgroundColor: newShade(theme,-30),
          borderRadius: "20px",
          height: "400px",
        }}
      >
        {!gameStarted ? <StartPage /> : <RenderGame />}
      </div>
    </div>
  );
}

export default Trivia;
