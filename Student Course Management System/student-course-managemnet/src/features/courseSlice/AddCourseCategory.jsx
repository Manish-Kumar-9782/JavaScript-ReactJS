import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { postCategories } from "../courseCategory/courseCategorySlice";

const AddCourseCategory = () => {
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = () => {
    dispatch(postCategories({ name: categoryName }));
    setCategoryName("");
  };
  return (
    <Form className="container card shadow p-4">
      <h1 className="mb-3 text-center">Add A Course Category</h1>
      <Form.Group controlId="courseName">
        <Form.Label>Add a Course Category</Form.Label>
        <Form.Control
          type="input"
          placeholder="Course Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </Form.Group>

      <Button type="button" onClick={handleSubmit}>
        Add Category
      </Button>
    </Form>
  );
};

export default AddCourseCategory;
