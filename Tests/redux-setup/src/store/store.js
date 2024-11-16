import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import taskListReducer from "./slices/taskListSlice";


export const store = configureStore({
    reducer: {
        counter: counterReducer,
        taskList: taskListReducer
    }
})