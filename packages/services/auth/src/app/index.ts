import express from 'express'
import type { Application, Request, Response } from 'express'

import auth from './auth'
import token from './token'

const app: Application = express()
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  return res.json({
    code: 200,
    message: 'Welcome to auth service!'
  })
})

app.use('/auth', auth)
app.use('/token', token)


export default app
