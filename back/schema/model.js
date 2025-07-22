const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: {type: String, required: true},
    reps: {type: Number, required: true},
    load: {type: Number, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true }, // Reference to User
},{timestamps: true})

module.exports = mongoose.model("workout",schema);