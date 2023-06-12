import express from "express"
import env from "dotenv"
import { studentRouter } from "./Routes/Students.js"
import { rootRouter } from "./Routes/Root.js"
import { courseRouter, courseIdRouter } from "./Routes/Courses.js"
import { courseCategoriesRouter } from "./Routes/CourseCategories.js"
import { connectDB } from "./config/dbConn.js"
import mongoose from "mongoose"
import { corsOptions } from "./config/corsOptions.js"
import cors from "cors";
import { TopicRouter } from "./Routes/CourseTopicsRoutes.js"

import { studentCourseRouter } from "./Routes/StudentCoursesRouter.js"

const PORT = process.env.PORT || 4000;

env.config() // setting the configuration for environment variables.
const app = express()

// Now we will try to connect to the database.
connectDB()

// a middleware to handle the json data.
app.use(express.json())
app.use(cors(corsOptions));

// Now we will apply the root router
app.use("/", rootRouter)
app.use("/students", studentRouter)
app.use("/courses", TopicRouter)
app.use("/courses", courseRouter)
app.use("/courses", courseIdRouter)
app.use("/course-categories", courseCategoriesRouter)
// Now we will handle the connection status inside the mongoose connection callback function.

mongoose.connection.once("open", () => {
    console.log("Connected to database")
    app.listen(PORT, () => console.log("listening on port: ", PORT))
})


// Now if there is any error on db connection then we will process by below callback function.
mongoose.connection.once("error", (error) => {
    console.log("Error connecting to database: ", error)

})