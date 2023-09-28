const express= require("express")
const app= express()
const connecton = require("./db")
require("dotenv").config();
const port= process.env.port || 9000;
const cors= require("cors");
const userRoutes= require("./routes/userRoutes");
const blogRoutes= require("./routes/blogRoutes")
const bodyparser=require("body-parser")


app.use(express.json())
app.use(cors())
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use("/api",userRoutes);
app.use("/api",blogRoutes);

app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.listen(port , async()=>{
    console.log(`App is running on port ${port}`)
    try {
        await connecton
        console.log("Db COnnected")
    } catch (error) {
        console.log("DB COnnection  Failed")
    }
})

