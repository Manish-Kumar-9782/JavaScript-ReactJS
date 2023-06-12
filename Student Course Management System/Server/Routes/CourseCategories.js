import express from "express";
import { getAllCourseCategories, addCourseCategory } from "../Controller/courseCategoriesController.js";
export const courseCategoriesRouter = express.Router();

courseCategoriesRouter.route("/")
    .get(getAllCourseCategories)
    .post(addCourseCategory);