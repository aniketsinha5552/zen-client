import {combineReducers, configureStore} from "@reduxjs/toolkit"
import userSlice from "./reducers/userSlice"
import themeSlice from "./reducers/themeSlice"

export const store= configureStore({
    reducer: {
        user: userSlice,
        theme: themeSlice
    }
})