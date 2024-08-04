import { createSlice } from "@reduxjs/toolkit";
import { addChatFb } from "../../utils/firebaseActions";


const initialMessage = {
    message: "Hello, I am ZenBot. How can I help you?",
    sender: "bot"
}

const chatSlice = createSlice({
    name: "chat",
    initialState: {chat: [initialMessage]},
    reducers:{
        addChat:(state,action)=>{
            const message = action.payload.message
            const sender = action.payload.sender
            state.chat.push(action.payload);
        },
        getHistory:(state,action)=>{
          
        },
        setChat:(state,action)=>{
            // console.log(action.payload)
            
            // action.payload.forEach(element => {
            //     state.chat.push(element)
            // });
            let sortedChat = action.payload
            sortedChat.sort((a,b)=> new Date(a.created_at) - new Date(b.created_at))
            state.chat = [initialMessage,...sortedChat]
        },
        deleteChat:(state)=>{

        }
    }
})


export const {addChat,getHistory,deleteChat,setChat} = chatSlice.actions
export default chatSlice.reducer