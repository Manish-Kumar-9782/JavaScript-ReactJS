import React from 'react';
import Student from './Student';
import Storage from './localStorage';
import { useEffect, useState } from 'react';

const studentStorage = new Storage("Students");

const Students = () => {

    const [students, setStudents] = useState([]);

    useEffect(() => {
        const data = studentStorage.getItem()
        console.log(data)
        setStudents(data)
    }, [])

    return (
        <div className="d-flex flex-wrap gap-3">
            {students.map((student, index) => (
                <Student
                    key={index}
                    name={student.name}
                    email={student.email}
                    phoneNumber={student.phoneNumber}
                    studentClass={student.studentClass}
                    school={student.school}
                />
            ))}
        </div>
    );
};

export default Students;
