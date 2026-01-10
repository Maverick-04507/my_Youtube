import mongoose from "mongoose"
import bcrypt, { compare } from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = mongoose.Schema(
    {
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase: true,
        trim: true,
        index: true  //to optimize search option
    },
    email:{
         type:String,
        required:true,
        unique:true,
        lowercase: true,
        trim: true,
    },
    fullname:{
         type:String,
        required:true,
        trim: true,
        index:true
    },
    avatar:{
        type:String,
        required:true,
    },
    coverImage:{
        type:String,
    },
    watchHistory:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    refreshTokens:{
        type:String
    }
    
},
{
    timeStamps:true 
})

userSchema.pre("save",async function(next){
    //Don't use arrow function  as arrow function does not have the context for this keyword
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = async function () {
    jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username:this.username,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = async function(){
     jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User",userSchema)