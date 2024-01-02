import { createSlice } from "@reduxjs/toolkit";
import { themes } from "../../constants/themes";

const userSlice= createSlice({
    name: "user",
    initialState:{
        user:null
    },
    reducers:{
        updateUser:(state,action)=>{
            state.user = action.payload
        },
        loginUser:(state,action)=>{
            // Todo: Move firebase auth logic here
        },
        saveTheme:(state,action)=>{
            const themeId = action.payload;
            const theme = themes.find((item)=>item.id==themeId);
            state.user.currTheme = theme;
        },
        savePlaylist:(state,action)=>{

        }
    }
})

export const {updateUser,saveTheme}= userSlice.actions
export default userSlice.reducer;