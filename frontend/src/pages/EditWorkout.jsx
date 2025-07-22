// src/pages/EditWorkout.jsx
import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditWorkout = () => {
  const { id } = useParams(); // Get the workout ID from the URL
  const [name, setName] = useState('');
  const [reps, setReps] = useState('');
  const [load, setLoad] = useState('');
  const navigate = useNavigate();

  // Fetch workout data based on the ID in the URL when the component mounts
  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await axiosInstance.get(`/workout/${id}`);
        const workout = response.data;
        setName(workout.name);
        setReps(workout.reps);
        setLoad(workout.load);
      } catch (error) {
        console.error('Error fetching workout:', error);
      }
    };

    fetchWorkout();
  }, [id]); // The effect depends on the ID; it runs whenever the ID changes (e.g., navigating to a different workout)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedWorkout = { name, reps, load };

    try {
      await axiosInstance.patch(`/workout/${id}`, updatedWorkout);
      navigate('/'); // Redirect to Home page after updating
    } catch (error) {
      console.error('Error updating workout:', error);
    }
  };

  return (
    <div>
      <h2>Edit Workout</h2>
      <form className="create" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Workout Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Load (kg)"
          value={load}
          onChange={(e) => setLoad(e.target.value)}
          required
        />
        <button type="submit">Update Workout</button>
      </form>
    </div>
  );
};

export default EditWorkout;
