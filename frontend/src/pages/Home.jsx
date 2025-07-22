import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import Details from "../components/Details";

const Home = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await axiosInstance.get("/workout");
        setWorkouts(res.data);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };
    fetchWorkouts();
  }, []);

  const handleDelete = (id) => {
    // Filter out the deleted workout from the state
    setWorkouts((prev) => prev.filter((workout) => workout._id !== id));
  };

  return (
    <div className='home'>
      <div className='workouts'>
        {workouts.map((workout) => (
          <Details key={workout._id} workout={workout} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Home;
