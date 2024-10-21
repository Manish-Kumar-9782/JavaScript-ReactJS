import React from 'react';


const Student = ({ name, email, phoneNumber, studentClass, school }) => {
    return (
        <div className="card m-3" style={{ width: '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{email}</h6>
                <p className="card-text">
                    <strong>Phone Number:</strong> {phoneNumber}<br />
                    <strong>Class:</strong> {studentClass}<br />
                    <strong>School:</strong> {school}
                </p>
            </div>
        </div>
    );
};

export default Student;
