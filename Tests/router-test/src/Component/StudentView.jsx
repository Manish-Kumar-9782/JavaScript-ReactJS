import React from 'react';
import { useParams } from 'react-router-dom';

const StudentView = ({ name, email, phoneNumber, studentClass, school, address, marks, activities, grades }) => {

    const { id } = useParams();

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <h4 className="card-subtitle mb-2 text-muted">{email}</h4>
                    <p className="card-text"><strong>Phone Number:</strong> {phoneNumber}</p>
                    <p className="card-text"><strong>Class:</strong> {studentClass}</p>
                    <p className="card-text"><strong>School:</strong> {school}</p>
                    <p className="card-text"><strong>Address:</strong> {address}</p>
                    <hr />
                    <h5 className="card-title">Marks</h5>
                    <ul className="list-group list-group-flush">
                        {marks.map((subject, index) => (
                            <li key={index} className="list-group-item"><strong>{subject.name}:</strong> {subject.marks}</li>
                        ))}
                    </ul>
                    <hr />
                    <h5 className="card-title">Extracurricular Activities</h5>
                    <ul className="list-group list-group-flush">
                        {activities.map((activity, index) => (
                            <li key={index} className="list-group-item">{activity}</li>
                        ))}
                    </ul>
                    <hr />
                    <h5 className="card-title">Grades</h5>
                    <p className="card-text">{grades}</p>
                </div>
            </div>
        </div>
    );
};

export default StudentView;
