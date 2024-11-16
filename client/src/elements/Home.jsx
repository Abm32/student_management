import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get('/students')
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.error(err);
                setError('Failed to fetch students. Please try again later.');
            });
    }, []);

    return (
        <div className="container-fluid bg-primary vh-100 vw-100 text-light">
            <h3 className="py-3">Students</h3>
            <div className="d-flex justify-content-end mb-3">
                <Link className="btn btn-success" to="/create">Add Student</Link>
            </div>
            {error && <p className="alert alert-danger">{error}</p>}
            {data.length === 0 && !error ? (
                <p>No students found. Add a student to get started!</p>
            ) : (
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((student) => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.age}</td>
                                <td>{student.gender}</td>
                                <td>
                                    <Link
                                        className="btn btn-info btn-sm me-2"
                                        to={`/read/${student.id}`}
                                    >
                                        Read
                                    </Link>
                                    <Link
                                        className="btn btn-warning btn-sm me-2"
                                        to={`/edit/${student.id}`}
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => {
                                            if (
                                                window.confirm(
                                                    `Are you sure you want to delete ${student.name}?`
                                                )
                                            ) {
                                                axios
                                                    .delete(`/delete_student/${student.id}`)
                                                    .then(() => {
                                                        setData((prevData) =>
                                                            prevData.filter(
                                                                (item) => item.id !== student.id
                                                            )
                                                        );
                                                    })
                                                    .catch((err) => {
                                                        console.error(err);
                                                        alert('Failed to delete the student.');
                                                    });
                                            }
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Home;
