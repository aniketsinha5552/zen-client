import { createSlice } from "@reduxjs/toolkit";
import { themes } from "../../constants/themes";

const themeSlice= createSlice({
    name: "theme",
    initialState:{
        theme: themes[0]
    },
    reducers:{
        changeThemeById:(state,action)=>{
            const themeId = action.payload;
            const theme = themes.find((item)=>item.id==themeId);
            state.theme = theme;

        }
    }
})

export const {changeThemeById}= themeSlice.actions
export default themeSlice.reducer;