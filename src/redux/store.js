import {combineReducers, configureStore} from "@reduxjs/toolkit"
import userSlice from "./reducers/userSlice"
import themeSlice from "./reducers/themeSlice"
import chatSlice from "./reducers/chatSlice"

export const store= configureStore({
    reducer: {
        user: userSlice,
        theme: themeSlice,
        chat: chatSlice
    }
})