import React from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axios";

const Details = ({ workout, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/workout/${workout._id}`); // Use relative URL with axiosInstance
      onDelete(workout._id); // Call the parent's delete handler
    } catch (error) {
      console.error("Error deleting workout:", error.response?.data || error.message);
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.name}</h4>
      <p>
        <strong>Load:</strong> {workout.load}
      </p>
      <p>
        <strong>Reps:</strong> {workout.reps}
      </p>
      <p>{new Date(workout.createdAt).toLocaleString()}</p>
      <Link to={`/update/${workout._id}`}>
        <button>Edit</button>
      </Link>
      <span onClick={handleDelete} style={{ color: "red" }}>
        Delete
      </span>
    </div>
  );
};

export default Details;
