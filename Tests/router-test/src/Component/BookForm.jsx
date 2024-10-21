import React, { useState } from 'react';
import { v4 as uuid_v4 } from 'uuid';

const BookForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        subject: '',
        pages: '',
        price: '',
        publisher: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const updated_form_data = { ...formData, id: uuid_v4() }
        console.log(updated_form_data);
        setFormData(updated_form_data);
        // Handle form submission, like sending data to an API
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title:</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    className="form-control"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="author" className="form-label">Author:</label>
                <input
                    id="author"
                    name="author"
                    type="text"
                    className="form-control"
                    value={formData.author}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="subject" className="form-label">Subject:</label>
                <input
                    id="subject"
                    name="subject"
                    type="text"
                    className="form-control"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="pages" className="form-label">Pages:</label>
                <input
                    id="pages"
                    name="pages"
                    type="number"
                    className="form-control"
                    value={formData.pages}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Price:</label>
                <input
                    id="price"
                    name="price"
                    type="number"
                    className="form-control"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="publisher" className="form-label">Publisher:</label>
                <input
                    id="publisher"
                    name="publisher"
                    type="text"
                    className="form-control"
                    value={formData.publisher}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default BookForm;
