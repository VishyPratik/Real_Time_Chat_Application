import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./UserSlice"
import messageSlice from "./MessageSlice"
export const store = configureStore({
    reducer: {
        user: userSlice,
        message:messageSlice,
    }
})