import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { dbConnect } from './lib/db/dbConnection.js'
import { envConfig } from './lib/configs/env.config.js'
import AuthRouter from './routers/auth.router.js'
import UserRouter from './routers/users.router.js'
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json()) //middleware
app.use(cookieParser()) // For parsing cookie

app.use(morgan("tiny"))
app.use(cors({
    // origin: ["http://localhost:3000","https://web-hackathon2025.vercel.app"], // Allow your frontend URL..
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
        allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
        credentials: true, // Allow cookies if needed

}))



app.get('/', (req,res) => {
    res.send("Hello world")
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
