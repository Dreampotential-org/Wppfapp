const notFound=(req,res,next)=>{
    const err=new Error(`not found -${req.originalUrl}`)
    res.status(404)
    next(err)

}



const errorMidlleWare=(error,req,res,next)=>{
    if(res.headerSent){
        return next(error)
    }
    res.status(error.code || 500).json({message: error.message || "unknowe error as accored "})

}

module.exports={
    notFound,
    errorMidlleWare
}