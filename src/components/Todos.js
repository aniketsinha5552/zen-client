import React, { useEffect, useState,useContext } from "react";
import { db } from "../firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { IconButton, List, ListItem } from "@mui/material";
import { Icon } from "@iconify/react";
import { themeContext } from "../homepage/home";

function Todos() {
  const contextData = useContext(themeContext);
  const theme = contextData.themes;
  const user = contextData.user;

  const [todo, setTodo] = useState([]);
  const todoRef = collection(db, "todos");

  const getTodos = async () => {
    try {
      const data = await getDocs(todoRef);
      const filteredData = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      console.log(filteredData);
      setTodo(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const [todoItem, setTodoItem] = useState("");
  const addItem = async (e) => {
    await addDoc(todoRef, {
      task: todoItem,
      user: user?.username,
    });
    getTodos();
    setTodoItem("");
  };

  const deleteItem = async (id) => {
    const itemDoc = doc(db, "todos", id);
    await deleteDoc(itemDoc);
    getTodos();
  };

  const todoList = todo.map((item) => {
     if(item.user===user?.username){
    return (
      <ListItem key={item.id}>
        &#x2022; {item.task}
        <IconButton title="Delete Item" onClick={() => deleteItem(item.id)}>
          <Icon icon="material-symbols:check" />
        </IconButton>
      </ListItem>
  )}
  })

  return (
    <div style={{ marginLeft: "5px" }}>
      <h2 style={{ marginTop: "35px",fontWeight:"500",marginBottom:"5px",}}>My tasks</h2>
      <input
        placeholder="Add an item"
        id="todoInput"
        onChange={(e) => setTodoItem(e.target.value)}
        style={{ width: "15rem", height: "20px" }}
        value={todoItem}
      ></input>
      <IconButton title="Add Item" onClick={addItem}>
        <Icon icon="material-symbols:add" />
      </IconButton>
      <List>
        {todoList}
        {/* {todo.map((item, idx) => {
          return (
            <ListItem sx={{ fontSize: "20px" }} key={idx}>
              {item.task} by {item.user}
              <IconButton
                title="Delete Item"
                onClick={() => deleteItem(item.id)}
              >
                <Icon icon="material-symbols:check" />
              </IconButton>
            </ListItem>
          );
        })} */}
      </List>
    </div>
  );
}

export default Todos;
