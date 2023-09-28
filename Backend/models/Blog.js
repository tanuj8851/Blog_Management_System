const mongoose= require("mongoose")

const blogSchema= new mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    category:{type:String,enum:["Tech","Lifestyle","Entertainment","Business"],required:true},
    // author:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    date:{type:Date,default:Date.now},
    likes:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    comments:[
        {
            user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
            text:String,
            date:{type:Date,default:Date.now}
        }
    ]
},{
    versionKey:false
})

module.exports=mongoose.model('Blog',blogSchema);