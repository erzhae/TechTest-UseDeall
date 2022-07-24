import {Router} from 'express'
import userCreate from './create'
import userDelete from './remove'
import userUpdate from './update'

import userList from './list'
import userDetail from './detail'

const user = Router()

user.get('/list', userDetail)
user.get('/detail', userDetail)

user.post('/create', userCreate)
user.put('/update', userUpdate)
user.delete('/delete', userCreate)


export default user