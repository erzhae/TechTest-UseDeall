import { Router } from 'express'
import create from './create'
import update from './update'

import list from './list'
import detail from './detail'

import { passport } from './../../loader'

const user = Router()

user.get('/list', passport.authorize('jwt', { session: false }), list)
user.get('/', passport.authorize('jwt', { session: false }), detail)

user.post('/create', passport.authorize('jwt', { session: false }), create)
user.put('/update', passport.authorize('jwt', { session: false }), update)

export default user
