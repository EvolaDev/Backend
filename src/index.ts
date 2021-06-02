import express, { Express, Request, Response } from 'express'
import helmet from 'helmet'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Post from './schemas/Post'
import { PRIVATE_MONGO_TOKEN, DEFAULT_PORT } from './constants/constants'

dotenv.config()

const PORT: number | string = process.env.PORT || DEFAULT_PORT
const app: Express = express()

app.use(express.json())
app.use(helmet())

app.post('/', async (req: Request, res: Response) => {
  try {
    const { author, title, content, picture } = req.body
    const post = await Post.create({ author, title, content, picture })
    res.json(post)
  } catch (error) {
    res.status(500).json(error)
  }
})

async function startApp(): Promise<void> {
  try {
    await mongoose.connect(PRIVATE_MONGO_TOKEN, { useUnifiedTopology: true, useNewUrlParser: true })
    app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`))
  } catch (error) {
    console.log(error)
  }
}

startApp()
