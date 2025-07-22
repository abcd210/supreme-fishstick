require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const workoutroutes = require("./routes/workout");
const cors = require("cors")
const userroutes = require("./routes/user")

const app = express();

app.use(cors())
app.use(express.json())

app.use("/workout",workoutroutes);
app.use("/user",userroutes);

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log("showtime........");    
        })
    })
    .catch((err)=>{
        console.log(err);
    })
