import { Button, IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import React, { useEffect, useState,useContext } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckBox } from "@mui/icons-material";
import { render } from "@testing-library/react";


function Trivia() {
  const navigate = useNavigate();


  const [curQues, setCurQues] = useState(0);
  const [triviaData, setTriviaData] = useState();
  const getTriviaData = async () => {
    const res = await axios.get(
      "https://opentdb.com/api.php?amount=10&type=multiple"
    );
    console.log(res.data.results);
    setTriviaData(res.data.results);
  };
  useEffect(() => {
    getTriviaData();
  }, []);
  const nextQuestion = () => {
    if (curQues < 9) {
      setCurQues(curQues + 1);
    } else {
      setGameOver(true);
    }
  };
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const RenderQuestion = () => {
    const options = triviaData && triviaData[curQues]?.incorrect_answers.concat(
      triviaData[curQues]?.correct_answer
    );

    const onOptionSelect = (option) => {
      if (option == triviaData[curQues]?.correct_answer) {
        setScore(score + 1);
      }
      nextQuestion();
    };

    const renderSymbol = (str) => {  
      let updatedStr=str;
      for(let i=0;i<str.length;i++){
        if(str[i]=="&"){
            updatedStr=str.slice(0,i)+" "+str.slice(i,str.length);
            i++
        }
        if(str[i]==";"){
          updatedStr=str.slice(0,i+1)+" "+str.slice(i+1,str.length);
          i++
      }
      } 
      return updatedStr;
      // return str.replace(/&quot;/g, '"').replace(/&#039;/g, "'");
    }
    return (
      <>
        <div style={{fontSize:"25px"}}>
          {triviaData &&
          <>
          Q {curQues + 1}. {renderSymbol(triviaData[curQues]?.question)}
          </>
          }
        </div>
        <List sx={{mt:2}}>
          {options?.map((option) => (
            // <Button
            //   variant="contained"
            //   sx={{ margin: 2 }}
            //   onClick={() => onOptionSelect(option)}
            //   key={option}
            // >
            //   {option}
            // </Button>
            <ListItem key={option} onClick={() => onOptionSelect(option)} sx={{fontSize:"22px",ml:3}}>
              <ListItemButton sx={{fontWeight:"lighter"}}>
                {option}   
              </ListItemButton>
            </ListItem>
          ))}
          </List>
        
        </>
    );
  };

  const restartGame = async() => {
    await getTriviaData();
    setGameOver(false);
    setCurQues(0);
    setScore(0);
    
  }

  const RenderScore = () => {
    let gif="";
    if(score>5){
       gif="https://media0.giphy.com/media/l0HlMr2G3EKFgpUY0/giphy.gif?cid=ecf05e47m0hzf7ocir30aw27rqhkih797a2w5xq4ixevdmeh&ep=v1_gifs_search&rid=giphy.gif&ct=g"
    }
    else{
        gif="https://media4.giphy.com/media/l3V0yA9zHe5m29sxW/giphy.gif?cid=ecf05e47m0hzf7ocir30aw27rqhkih797a2w5xq4ixevdmeh&ep=v1_gifs_search&rid=giphy.gif&ct=g"
    }
    return(
        <div style={{display:"grid",placeItems:"center"}}>
            <img style={{height:"250px"}} src={gif}></img>
           <h3 style={{ textAlign: "center",fontWeight:"lighter",fontSize:"30px" }}> Game Over! Your score is {score}/10</h3>
            <IconButton onClick={restartGame}><Icon icon="ic:round-restart-alt" /></IconButton>
        </div>
    )
  }

  return (
    <div className="trivia" style={{ padding: 10 }}>
      <div className="heading">
        <IconButton sx={{ ml: 2 }} onClick={() => navigate("/")}>
          <Icon icon="material-symbols:arrow-back" />
        </IconButton>
        <h1 style={{ marginRight: "50px",fontWeight:"normal" }}>💡Trivia Game</h1>
      </div>
      <h2 style={{ textAlign: "center",fontWeight:"lighter",marginBottom:"20px",padding:"10px" }}>
        A random trivia game. Answer the most out of ten questions
      </h2>
      <div style={{ padding: 10, margin: "20px" }}>
        {gameOver == false ? (
          <RenderQuestion />
        ) : (
            <RenderScore />
        )}
        {/* <IconButton onClick={nextQuestion} disabled={curQues==9}><Icon icon="material-symbols:navigate-next" /></IconButton> */}
      </div>
    </div>
  );
}

export default Trivia;
