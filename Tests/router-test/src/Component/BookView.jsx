import React from 'react';
import { useParams } from 'react-router-dom';

const BookView = ({ title, author, subject, pages, price, publisher, contentIndex, preface }) => {
    const { id } = useParams();

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    <h4 className="card-subtitle mb-2 text-muted">by {author}</h4>
                    <p className="card-text"><strong>Subject:</strong> {subject}</p>
                    <p className="card-text"><strong>Pages:</strong> {pages}</p>
                    <p className="card-text"><strong>Price:</strong> ${price}</p>
                    <p className="card-text"><strong>Publisher:</strong> {publisher}</p>
                    <hr />
                    <h5 className="card-title">Content Index</h5>
                    <ul className="list-group list-group-flush">
                        {contentIndex.map((item, index) => (
                            <li key={index} className="list-group-item">{item}</li>
                        ))}
                    </ul>
                    <hr />
                    <h5 className="card-title">Preface</h5>
                    <p className="card-text">{preface}</p>
                </div>
            </div>
        </div>
    );
};

export default BookView;
