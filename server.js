import express from "express"
import colors from 'colors'
import dotenv from "dotenv"
import morgan from "morgan"
import connectDB from "./config/db.js"
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from'./routes/productRoutes.js'
import cors from 'cors'

//config env
dotenv.config()

//databse config
connectDB()

//rest object
const app= express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes)

//rest api
app.get('/', (req,res)=>{
    res.send({
        message: 'welcome'
    })
})

app.listen(process.env.PORT || 8080 ,()=>{
    console.log(`server running on ${process.env.PORT || 8080}`.bgCyan.white);
})
