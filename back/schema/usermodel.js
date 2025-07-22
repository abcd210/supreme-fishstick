const mongoose = require("mongoose")
const bcryt = require("bcrypt")
const validator = require("validator")


const schema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
})

schema.statics.signup = async function(email,password){

    if (!email || !password) {
        throw Error("Email and password are required");
    }

    if(!validator.isEmail(email)){
        throw Error("email is not valid")
    }

    if(!validator.isStrongPassword(password)){
        throw Error("password is not strong enough")
    }

    const exists = await this.findOne({email})
    if(exists){
        throw Error("email already exists")
    }

    const salt = await bcryt.genSalt(10)
    const hash = await bcryt.hash(password,salt)

    const user = await this.create({email,password: hash})
    return user
}

schema.statics.login = async function (email,password) {
    if (!email || !password) {
        throw Error("Email and password are required");
    }

    const user = await this.findOne({email})
    if(!user){
        throw Error("incorrect email")
    }

    const match = await bcryt.compare(password,user.password)
    if(!match){
        throw Error("invalid credentials")
    }

    return user;

}

module.exports = mongoose.model("users",schema)

