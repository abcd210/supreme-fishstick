const User = require("../schema/usermodel")
const jwt = require("jsonwebtoken")

const createToken = (_id) =>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn: "1h"})
}

const userLogin = async (req,res) => {
    const {email,password} = req.body

    try{
        const user = await User.login(email,password)
        const token = createToken(user._id)
        return res.status(200).json({user,token})
    }
    catch(error){
        return res.status(400).json({error: error.message})
    }
}

const userSignup = async (req,res) => {
    const {email,password} = req.body
    try{
        const user = await User.signup(email,password)
        const token = createToken(user._id)
        return res.status(200).json({user,token})
    }
    catch(error){
        return res.status(400).json({error: error.message})
    }
}

module.exports = {userLogin,userSignup}