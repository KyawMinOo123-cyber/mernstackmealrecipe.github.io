import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import { userRouter } from './routes/userRoute.js'
import { recipeRouter } from './routes/recipeRoute.js'

const app = express()
const url = process.env.URL

//middleWares
app.use(express.json())
app.use(cors())
app.use('/auth',userRouter)
app.use('/recipes',recipeRouter)



//database connection

mongoose.connect(url)
.then(()=>console.log("Database connected..."))
.catch(err=>console.log(err))

app.listen(3001,()=>console.log("Server is listening port 3001...."))