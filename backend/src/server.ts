import express from 'express'
import cors from 'cors'
import { main_routes } from './routes/main.routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(main_routes)

app.listen(3000, () => {
    console.log('server running on http://localhost:3000')
})