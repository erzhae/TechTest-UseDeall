import express from 'express'
import type { Application, Request, Response } from 'express'
import user from './user'

const app: Application = express()
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  return res.json({
    code: 200,
    message: 'Welcome to user service!'
  })
})

app.use('/user', user)

export default app
