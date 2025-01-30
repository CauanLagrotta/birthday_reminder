import express from 'express'
import cors from 'cors'

const app = express()

app.listen(3000, () => {
    console.log('server running on http://localhost:3000')
})