import { PrismaClient } from '@prisma/client'
import { env } from './../conf'
const prisma = new PrismaClient({
  log: env.name !== 'prod' ? ['warn', 'error'] : undefined
})

export default prisma
