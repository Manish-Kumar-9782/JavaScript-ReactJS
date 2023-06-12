import { createSlice, createEntityAdapter, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const STUDENT_URL = 'http://localhost:4000/students'
export const fetchStudent = createAsyncThunk("students/fetchStudent", async () => {
    const response = await axios.get(STUDENT_URL);
    return response.data;
})

export const addStudent = createAsyncThunk("students/addStudent", async (studentData) => {
    console.log("adding student data: ", studentData)
    const response = await axios.post(STUDENT_URL, studentData);
    return response.data;
})

export const studentAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.id - b.id,
    selectId: state => state._id
})


const initialState = studentAdapter.getInitialState({
    status: 'idle', // loading, success, failed.
    error: null
});

export const studentSlice = createSlice({
    name: "students",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        // adding a case for fetching student, and if it is pending.
        builder.addCase(fetchStudent.pending, (state, action) => {
            console.log("loading student: ", action.payload)
            state.status = 'pending';
        })

        // adding a case for fetching student, and if it is success
        builder.addCase(fetchStudent.fulfilled, (state, action) => {
            console.log("loading completed: ", action.payload)
            state.status = 'success';
            studentAdapter.upsertMany(state, action.payload)
        })

        builder.addCase(fetchStudent.rejected, (state, action) => {
            console.log("Error occurred during fetching student: ", action.error)
            state.status = 'failed'
            state.error = action.error;
        })

        builder.addCase(addStudent.fulfilled, (state, action) => {
            state.status = 'success'
            console.log("Adding student: ", action.payload)
        })

        builder.addCase(addStudent.rejected, (state, action) => {
            state.status = 'failed'
            console.log("Error occurred during adding student: ", action)
        })
    }
})


export const { selectAll: selectAllStudents,
    selectById: selectStudentById } = studentAdapter.getSelectors(state => state.students)

export default studentSlice.reducer