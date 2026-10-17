import express from 'express'
import authRoutes from './routes/auth.routes.js'
import noteRoutes from './routes/note.routes.js'
import folderRoutes from './routes/folder.routes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'


const app = express()

app.use(cors({
    origin: "http://localhost:4000",
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/v1/notes', noteRoutes)
app.use('/api/v1/folders', folderRoutes)

export default app;