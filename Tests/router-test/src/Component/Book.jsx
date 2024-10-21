import React from 'react';


const Book = ({ title, author, subject, pages, price, publisher }) => {
    return (
        <div className="card m-3" style={{ width: '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{author}</h6>
                <p className="card-text">
                    <strong>Subject:</strong> {subject}<br />
                    <strong>Pages:</strong> {pages}<br />
                    <strong>Price:</strong> {price}<br />
                    <strong>Publisher:</strong> {publisher}
                </p>
            </div>
        </div>
    );
};

export default Book;
