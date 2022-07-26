import dotenv from 'dotenv'
import { Algorithm } from 'jsonwebtoken'

dotenv.config()

export const env = {
  name: process.env.ENV_NAME || 'prod',
  port: process.env.PORT || 4000,
  jwtSecret: process.env.JWT_SECRET || '',
  jwtAlgorithm: process.env.JWT_ALOGRITHM || ('HS256' as Algorithm)
}
