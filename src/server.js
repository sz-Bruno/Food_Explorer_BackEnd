require('express-async-errors')
require('dotenv/config')
const express= require('express')
const cors= require('cors')
const app= express()
const routes= require('./Routes/index')
const AppError= require('./Utils/AppError')
const Database= require('./Database/sqlite')
const UploadConfig= require('./Configs/upload')
app.use(cors())
app.use(express.json())
app.use("/files",express.static(UploadConfig.UPLOADS_FOLDER))
app.use(routes)


app.use((error,request,response,next)=>{
    if(error instanceof AppError){
        response.status(error.StatusCode).json({
            status:'error',
            message:error.Message
        })
    }
    console.error(error)
    
    return response.status(500).json({

        status:'error',
        message:'Internal Server Error'
    })
})
Database()
const PORT= process.env.PORT || 3333

app.listen(PORT, ()=>console.log('Food Explorer is alive!'))

