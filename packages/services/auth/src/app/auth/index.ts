import {Router} from 'express'
import signIn from './signIn'
import signOut from './signOut'
import signUp from './signUp'

const auth = Router()

auth.post('/sign-up', signUp)
auth.post('/sign-in', signIn)
auth.post('/sign-out', signOut)

export default auth