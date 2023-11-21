import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { userModel } from '../models/users.js';
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router()
const secretPassword = process.env.SECRET_PASSWORD

router.post('/register',async(req,res)=>{
    const {username,password} = req.body;

    const user = await userModel.findOne({username}); //username === username from req.body
    if(user){
       return res.json({message:"User name already exist"})
    }

    const hashedPw = await bcrypt.hash(password,10);
    const newUser = new userModel({username,password:hashedPw})
    await newUser.save()

    res.json({message:"Registered Successfully"});

}); 

router.post('/login',async(req,res)=>{
    const {username,password} = req.body
    const user = await userModel.findOne({username})
    if(!user) return res.json({message:"User Doesn't Exists"})

    const isPasswordValid = await bcrypt.compare(password,user.password)
    if(!isPasswordValid) return res.json({message:"Username or Password doesn't match"})

    const token = jwt.sign({id:user._id},secretPassword)
    res.json({token,userID:user._id})
});

export {router as userRouter}

export const verifyTwoken =(req,res,next)=>{
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token,secretPassword,(err)=>{
            if(err) return res.status(403);
            next();
        })
    }else{
        res.status(401)
    }
}