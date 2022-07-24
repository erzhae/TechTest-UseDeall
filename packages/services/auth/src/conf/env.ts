import dotenv from 'dotenv'

dotenv.config()

export const env = {
  name: process.env.ENV_NAME || 'prod',
  port: process.env.PORT || 4000
}
