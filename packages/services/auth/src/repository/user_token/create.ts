import { prisma } from './../../loader'
import type { TokenStatus } from '@prisma/client'
export const createUserToken = async (data: {
  credentialId: string
  token: string
  refreshToken: string
  tokenStatus?: TokenStatus
}) => {
  try {
    const result = await prisma.userToken.create({
      data
    })

    return result
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`[prisma]: ${error.message}`)
    }
    throw error
  }
}
