import { courseCategoriesModel } from "../models/CourseCategoriesModel.js";
import asyncHandler from 'express-async-handler'

export const getAllCourseCategories = asyncHandler(async (req, res) => {
    const response = await courseCategoriesModel.find();
    // console.log("get all categories response: ", response)
    return res.status(200).json(response);
})

export const addCourseCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
    if (name) {
        const response = await courseCategoriesModel.create({ name });
        if (response) {
            res.status(200).json({ message: "Course Category added successfully", entity: response });
        }
        else {
            res.status(404).json({ message: "Error creating category" })
        }
    }
})