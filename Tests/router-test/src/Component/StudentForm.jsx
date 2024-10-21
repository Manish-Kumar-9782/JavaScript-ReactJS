import React, { useState } from 'react';
import { v4 as uuid_v4 } from "uuid"

const StudentForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        class: '',
        school: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value, id: uuid_v4() });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const updated_form_data = { ...formData, id: uuid_v4() }
        setFormData(updated_form_data);
        console.log(updated_form_data);
        // You can do more with the form data here, like sending it to an API
    };


    return (
        <form onSubmit={handleSubmit} className="p-4">
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name:</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
                <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    className="form-control"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="class" className="form-label">Class:</label>
                <input
                    id="class"
                    name="class"
                    type="text"
                    className="form-control"
                    value={formData.class}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="school" className="form-label">School:</label>
                <input
                    id="school"
                    name="school"
                    type="text"
                    className="form-control"
                    value={formData.school}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default StudentForm;
