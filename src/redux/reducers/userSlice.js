import { createSlice } from "@reduxjs/toolkit";

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
        }
    }
})

export const {updateUser}= userSlice.actions
export default userSlice.reducer;