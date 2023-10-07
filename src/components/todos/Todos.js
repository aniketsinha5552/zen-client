import React, { useEffect, useState, useContext } from "react";
import { db } from "../../firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { IconButton, List, ListItem } from "@mui/material";
import { Icon } from "@iconify/react";
import { themeContext } from "../../homepage/home";
import { newShade } from "../../App";
import soft_click from "../../assets/sounds/soft_click.wav";
import styles from "./todos.module.css"

const butonClick = new Audio(soft_click);
butonClick.volume = 0.1;


function Todos() {
  const contextData = useContext(themeContext);
  const theme = contextData.themes;
  const user = contextData.user;

  const tabButtonStyle = {
    backgroundColor: "transparent",
    flex: 0.5,
    fontWeight: "500",
    fontSize: "15px",
    marginTop: "2px",
    borderRadius: "5px",
    border: "1px solid #000000",
    marginLeft: "px",
    marginRight: "3px",
    padding: "5px 5px",
  };

  const [allTodo, setAllTodo] = useState([]);
  const todoRef = collection(db, "todos");
  const q = query(todoRef, where("user", "==", user?.username));

  const getCompleted = () => {
    const completed = allTodo.filter((item) => item.completed === true);
    return completed;
  };
  const getIncomplete = () => {
    const incomplete = allTodo.filter((item) => item.completed === false);
    return incomplete;
  };
  const [todo, setTodo] = useState([]);
  // 1: all, 2: completed, 3: incomplete
  const [tabSelected, setTabSelected] = useState(3);

  const getAllTodos = async () => {
    try {
      const data = await getDocs(q);
      const filteredData = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      console.log(filteredData);
      if (allTodo.length === 0)
        setTodo(filteredData.filter((item) => item.completed === false));
      setAllTodo(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  useEffect(() => {
    if (tabSelected === 1) setTodo(allTodo);
    else if (tabSelected === 2) setTodo(getCompleted());
    else setTodo(getIncomplete());
  }, [allTodo]);

  const [todoItem, setTodoItem] = useState("");
  const addItem = async (e) => {
    await addDoc(todoRef, {
      task: todoItem,
      user: user?.username,
      completed: false,
    });
    getAllTodos();
    setTodoItem("");
  };

  const deleteItem = async (id) => {
    const itemDoc = doc(db, "todos", id);
    await deleteDoc(itemDoc);
    getAllTodos();
  };

  const changeStatus = async (id) => {
    const itemDoc = doc(db, "todos", id);
    await updateDoc(itemDoc, {
      completed: true,
    });
    getAllTodos();
  };

  const todoList = todo.map((item) => {
    return (
      <ListItem
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          flexWrap: "wrap",
          width: "100%",
          marginLeft: "5px",
          padding: 0,
          paddingLeft: "10px",
          paddingRight: "10px",
          // alignItems: "center",
          // height: "50px",
          "&:hover": {
            backgroundColor: newShade(theme, -30),
          }
        }}
        key={item.id}
      >
        <p style={{flex:0.9,fontSize:"19px"}}>
          {item.task}{" "}
        </p>
        <div>
          {!item.completed && (
            <IconButton
              title="Task Completed"
              onClick={() => changeStatus(item.id)}
            >
              <Icon icon="material-symbols:check" />
            </IconButton>
          )}
          <IconButton title="Delete Task" onClick={() => deleteItem(item.id)} >
            <Icon icon="iconoir:cancel" />
          </IconButton>
        </div>
      </ListItem>
    );
  });

  const changeTab = (e) => {
    butonClick.play();
    setTabSelected(e.target.id);
    if (e.target.id == 1) {
      setTodo(allTodo);
    } else if (e.target.id == 2) {
      setTodo(getCompleted());
    } else if (e.target.id == 3) {
      setTodo(getIncomplete());
    }
  };

  return (
    <div className="todo_container">
      <h2 >
        My tasks
      </h2>
      {/* Complete and incomplete tabs */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          marginTop: "10px",
        }}
      >
        <button
          id="3"
          onClick={changeTab}
          style={{
            ...tabButtonStyle,
            backgroundColor:
              tabSelected == 3 ? newShade(theme, -30) : "transparent",
          }}
        >
          Active
        </button>
        <button
          id="2"
          onClick={changeTab}
          style={{
            ...tabButtonStyle,
            backgroundColor:
              tabSelected == 2 ? newShade(theme, -30) : "transparent",
          }}
        >
          Completed
        </button>
        <button
          id="1"
          onClick={changeTab}
          style={{
            ...tabButtonStyle,
            backgroundColor:
              tabSelected == 1 ? newShade(theme, -30) : "transparent",
          }}
        >
          All Tasks
        </button>
      </div>
      <input
        placeholder="Add an item"
        id="todoInput"
        onChange={(e) => setTodoItem(e.target.value)}
        value={todoItem}
      ></input>
      <IconButton title="Add Item" onClick={addItem}>
        <Icon icon="material-symbols:add" />
      </IconButton>
      <div className="todo-list">
        <List>{todoList}</List>
      </div>
    </div>
  );
}

export default Todos;
