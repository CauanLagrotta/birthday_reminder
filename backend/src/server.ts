import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { main_routes } from './routes/main.routes'
import "./jobs/schedule"

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(main_routes)

app.listen(3000, () => {
    console.log('server running on http://localhost:3000')
})