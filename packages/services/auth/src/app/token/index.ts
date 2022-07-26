import {Router} from 'express'
import authorize from './authorize'
import refresh from './refresh'

const token = Router()

token.get('/authorize/:token', authorize)
token.post('/refresh', refresh)

export default token