import express from 'express'
import type { Application, Request, Response } from 'express'

import credential from './credential'
import token from './token'

const app: Application = express()
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  return res.json({
    code: 200,
    message: 'Welcome to auth service!'
  })
})

app.use('/credential', credential)
app.use('/token', token)


export default app
