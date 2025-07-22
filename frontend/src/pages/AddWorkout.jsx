// src/pages/AddWorkout.jsx
import React, { useState } from 'react';
import axiosInstance from '../api/axios';
import { useNavigate } from 'react-router-dom';

const AddWorkout = () => {
  const [name, setName] = useState('');
  const [reps, setReps] = useState('');
  const [load, setLoad] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const newWorkout = { name, reps, load };

    try {
      await axiosInstance.post('/workout', newWorkout);
      navigate('/'); 
    } catch (error) {
      console.error('Error submitting workout:', error);
    }
  };

  return (
    <div>
      <h2>Add New Workout</h2>
      <form className="create"onSubmit={handleSubmit}>
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
        <button type="submit">Add Workout</button>
      </form>
    </div>
  );
};

export default AddWorkout;
