import React, { useEffect, useState } from "react";
import ChromeDinoGame from "react-chrome-dino";
import { IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { newShade } from "../App";

export default function ({ theme }) {
  const navigate = useNavigate();
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(30);
  const [speed, setSpeed] = useState(1);

  const randomizeArray = (size=arraySize) => {
    let arr = [];
    for (let i = 0; i < size; i++) {
      arr.push(Math.floor(Math.random() * 100) + 1);
    }
    setArray(arr);
  };

  useEffect(() => {
    randomizeArray();
  }, []);

  const buttonStyle = {
    backgroundColor: `${newShade(theme, -50)}`,
    margin: "4px",
    border: "1px solid black",
    borderRadius: "5px",
    color: "white",
    padding: "5px",
  };
  const dropdownStyle = {
    backgroundColor: `${newShade(theme, -50)}`,
    margin: "4px",
    border: "1px solid black",
    borderRadius: "5px",
    color: "white",
    padding: "5px",
  };

  const [isSorting, setIsSorting] = useState(true);

  const bubbleSort = () => {
    let arr = [...array];
    let animations = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        animations.push([j, j + 1]);
        animations.push([j, j + 1]);
        if (arr[j] > arr[j + 1]) {
          animations.push([j, j + 1, arr[j + 1], arr[j]]);
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        } else {
          animations.push([j, j + 1, arr[j], arr[j + 1]]);
        }
      }
    }
    for (let i = 0; i < animations.length; i++) {

      const arrayBars =
        document.getElementsByClassName("array-container")[0].childNodes;
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color =
          i % 3 === 0 ? `${newShade(theme, 30)}` : `${newShade(theme, -50)}`;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, (i * 10)/speed);
      } else {
        setTimeout(() => {
          const [barOneIdx, barTwoIdx, barOneHeight, barTwoHeight] =
            animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barOneStyle.height = `${barOneHeight * 3}px`;
          barTwoStyle.height = `${barTwoHeight * 3}px`;
        }, (i * 10)/speed);
      }
    }
  };

  const onArraySizeChange = (e) => {
    setArraySize(e.target.value);
    randomizeArray(e.target.value);
  }

  return (
    <div>
      <div className="heading">
        <IconButton sx={{ ml: 2 }} onClick={() => navigate("/")}>
          <Icon icon="material-symbols:arrow-back" />
        </IconButton>
        <h1 style={{ marginRight: "50px", fontWeight: "normal" }}>
          Sorting Visualizer
        </h1>
      </div>
      <div
        className="array-container"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        {array.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                width: `${(100 / array.length)*10}px`,
                height: `${item * 3}px`,
                backgroundColor: newShade(theme, 50),
                border: "1px solid black",
                margin: "0 1px",
                borderRadius: "10px",
              }}
            ></div>
          );
        })}
      </div>
      <div
        className="buttons"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        <select onChange={(e)=>onArraySizeChange(e)} style={dropdownStyle} >
          <option value={30}>30</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <select onChange={(e)=>setSpeed(e.target.value)}  style={dropdownStyle}>
          <option value="1">Slow</option>
          <option value="2">Medium</option>
          <option value="3">Fast</option>
        </select>
        <button
          style={buttonStyle}
          onClick={()=>randomizeArray(arraySize)}
        >
          New Array
        </button>
        {/* <button onClick={selectionSort}>Selection Sort</button> */}
        <button
          style={buttonStyle}
          onClick={bubbleSort}
        >
          Bubble Sort
        </button>
      </div>
    </div>
  );
}
