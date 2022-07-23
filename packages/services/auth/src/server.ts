import app from './app'
import {env} from './conf'

const PORT = env.port
const ENV_NAME = env.name
const startServer = async () => {
  return await app.listen(PORT, () => {
    if (ENV_NAME !== 'prod') {
      console.info(`[server]: ENV`, env)
    }
    console.info(`[server]: Server Up! at http://localhost:${PORT}`)
  })
}

startServer().catch(err => {
  throw err
})