import {create} from './hash'
import jwt from 'jsonwebtoken'
import dayjs from 'dayjs'
import { env } from './../conf'

const REFRESH_TOKEN_SALT = 'refresh-token-please'
const JWT_SECRET = env.jwtSecret
const JWT_ALGORITHM = env.jwtAlgorithm as jwt.Algorithm
const JWT_EXPIRE = '14d'

export const createRefreshToken = (params: {username: string}) => {
  const todayMillis = dayjs().valueOf()

  const {username} = params
  const textToHash = `${username}_${todayMillis}`

  return create(textToHash, REFRESH_TOKEN_SALT)
}

export const createJwtToken = (params: {credentialId: string, username: string, refreshToken: string, userRole: string}) => {
  const newJwt = jwt.sign(params, JWT_SECRET, {
    algorithm: JWT_ALGORITHM,
    expiresIn: JWT_EXPIRE
  })
  return newJwt
}

export const verifyJwtToken = (jwtToken: string) => {
  return jwt.verify(jwtToken, JWT_SECRET)
}