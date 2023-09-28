const express= require("express")
const router= express.Router()
const bcrypt= require("bcrypt")
const jwt = require("jsonwebtoken");
const User= require("../models/User");
const jwt_secret_key= process.env.jwt_secret_key || "masai";


router.post("/register",async(req,res)=>{
    try {
        
        const {username,email,password}= req.body;
        console.log(email,password);

        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(400).send({msg:"Email alredy Registered"})
        }
        const hashedPassword= await bcrypt.hash(password,10);
        console.log(hashedPassword);
        const user= new User({
            username,
            email,
            password:hashedPassword
        })

        await user.save();
        res.status(200).send({msg:"user Created Successfully"})

    } catch (error) {
        console.log(error)
        res.status(500).send({msg:error})
    }
})



router.post("/login",async(req,res)=>{
    try {
        
        const {email,password}= req.body;

        const user= await User.findOne({email})
        if(!user) return res.status(400).send({msg:"email not registered"})
        
       const isPasswordValid= await bcrypt.compare(password,user.password);

       if(!isPasswordValid) return res.status(401).send({msg:"Password not matched"})

       const token= jwt.sign({userId:user._id},jwt_secret_key,{expiresIn:"5h"})

       res.status(200).send({msg:"user logged-In Successfully",token})

    } catch (error) {
        console.log(error)
        res.status(500).send({error:"Login Failed"})
    }
})










module.exports=router;
