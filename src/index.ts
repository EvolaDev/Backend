import express, { Express, Request, Response } from 'express'
import helmet from 'helmet'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import router from './router'
import { PRIVATE_MONGO_TOKEN, DEFAULT_PORT } from './constants/constants'

dotenv.config()

const PORT: number | string = process.env.PORT || DEFAULT_PORT
const app: Express = express()

app.use(express.json())
app.use(helmet())
app.use('/api', router)

async function startApp(): Promise<void> {
  try {
    await mongoose.connect(PRIVATE_MONGO_TOKEN, { useUnifiedTopology: true, useNewUrlParser: true })
    app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`))
  } catch (error) {
    console.log(error)
  }
}

startApp()
