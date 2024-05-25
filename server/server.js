const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const upload=require('express-fileupload')
const userRouter=require('./routes/userRouter')

const postsRouter=require('./routes/postsRouter')
const { notFound, errorMidlleWare } = require('./midllewaers/errorMidleware')
dotenv.config()

const app=express();
app.use(express.json({extended: true}))
app.use(express.urlencoded({extended: true}))
const port=process.env.PORT
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true,
    
}))
app.use(upload())
app.use('/uploads',express.static(__dirname + '/uploads'))
app.use('/api/users',userRouter)
app.use('/api/posts',postsRouter)
app.use(notFound)
app.use(errorMidlleWare)


mongoose.connect(process.env.MONGO_URL,{
    
},console.log("conneted to the dataBase"))

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})