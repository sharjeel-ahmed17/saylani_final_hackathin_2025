import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { dbConnect } from './lib/db/dbConnection.js'
import { envConfig } from './lib/configs/env.config.js'
import AuthRouter from './routers/auth.router.js'
import UserRouter from './routers/users.router.js'
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json()) 
app.use(cookieParser()) 
app.use(morgan("tiny"))
app.use(cors({
    origin: ["http://localhost:3000","https://saylani-final-hackathin-2025.vercel.app"], 
        methods: ['GET', 'POST', 'PUT', 'DELETE'], 
        allowedHeaders: ['Content-Type', 'Authorization'], 
        credentials: true, 
}))



app.get('/', (req,res) => {
    res.send("Hello world KIYA HAAL HAI DOSTOO")
})

dbConnect()
    .then(() => {
        app.use('/api/auth',AuthRouter)
        app.use('/users',UserRouter)
        app.listen(envConfig.PORT, () => {
            console.log("App running on Port 5000"); 
        })
    
}).catch((error)=>console.log("error =>",error)
)
