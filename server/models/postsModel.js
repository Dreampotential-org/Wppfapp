const mongoose=require('mongoose')
const { Schema } = mongoose;

const postSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        enum: ["Agriculture","Bussienes","Educatio","Entertiament","Art","Investment","Uncategorized","Whether"],
        message: "{vakue are not an=ble }"
    },
    description: {
        type:String,
        required:true
    },
    thambnail: {
        type:String,
        required:true
    },
    creator:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    
},{timestamps: true})

module.exports=mongoose.model('Posts',postSchema)