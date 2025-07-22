const collec = require("../schema/model");
const mongoose = require("mongoose");

// Get all workouts for the logged-in user
const getall = async (req, res) => {
    const userId = req.user._id; // Extract user ID from the middleware
    try {
        const data = await collec.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single workout by ID (ensure it belongs to the logged-in user)
const getone = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid ID" });
    }

    try {
        const data = await collec.findOne({ _id: id, userId: req.user._id });
        if (!data) {
            return res.status(404).json({ error: "Workout not found" });
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new workout for the logged-in user
const create = async (req, res) => {
    const { name, reps, load } = req.body;
    const userId = req.user._id;

    try {
        const data = await collec.create({ name, reps, load, userId });
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a workout by ID (ensure it belongs to the logged-in user)
const update = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid ID" });
    }

    try {
        const data = await collec.findOneAndUpdate(
            { _id: id, userId: req.user._id },
            { ...req.body },
            { new: true } // Return the updated document
        );
        if (!data) {
            return res.status(404).json({ error: "Workout not found" });
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a workout by ID (ensure it belongs to the logged-in user)
const del = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid ID" });
    }

    try {
        const data = await collec.findOneAndDelete({ _id: id, userId: req.user._id });
        if (!data) {
            return res.status(404).json({ error: "Workout not found" });
        }
        res.status(200).json({ message: "Workout deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getall, getone, create, update, del };
