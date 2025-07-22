import { useState } from "react"
import axios from "axios";

const WorkoutForm = () => {
    const [formData, setFormData] = useState({ name: "", reps: "", load: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async(e) =>{
        e.preventDefault()
        await axios.post(`http://localhost:5000/workout/`, formData);
        navigate("/");

    }
    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>add new</h3>
            <label >Name :</label>
            <input type="text" onChange={handleChange} value={formData.name} required/>

            <label >Reps :</label>
            <input type="number" onChange={handleChange} value={formData.reps} required/>

            <label >Load :</label>
            <input type="number" onChange={handleChange} value={formData.load} required/>

            <button type="submit">add</button>
        </form>
    )
}

export default WorkoutForm;