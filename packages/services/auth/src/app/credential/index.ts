import {Router} from 'express'
import signIn from './signIn'
import signUp from './signUp'

const credential = Router()

credential.post('/sign-up', signUp)
credential.post('/sign-in', signIn)

export default credential