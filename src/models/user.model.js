import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
const userSchema = new Schema(
    {   
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index:true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        }, 
        fullname: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        }, 
        fullname: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            index:true
        }, 
        avatar : {
            type: String,
            required: true,
        }, 
        coverImg: {
            type: String
        }, 
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref:"video"
            }
        ],
        password:
        {
            type: String,
            required:true,
        },
        refreshTokens:{
            type:String
        },
    },
    {
        timestamps:true
    }
)
userSchema.pre("save", async function (next){
    if (!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10)
    next()
},
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password)  
    },
    userSchema.method.generateAccessTokens = async function () {
        jwt.sign({
            _id: this.id,
            email: this.email,
            username: this.username,
            fullname:this.fullname
        },
            process.env.ACESS_SECRET_TOKEN,
        {
            expiryIn:process.env.ACCESS_TOKEN_EXPIRY
        }
        )
    },
    userSchema.method.generateRefreshTokens = async function () {
     jwt.sign({
            _id: this.id
        },
            process.env.REFRESH_TOKEN_SECRET,
        {
            expiryIn:process.env.REFRESH_TOKEN_EXPIRY
        }
        )
    },
)
export const User= mongoose.model("User",userSchema)