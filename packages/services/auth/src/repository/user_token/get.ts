import { TokenStatus } from '@prisma/client'
import {prisma} from './../../loader'

export const getUserTokenWithTokenStatus = async (params: {credentialId: string, tokenStatus: TokenStatus}) => {
  const {credentialId, tokenStatus} = params
  try {
    const result = await prisma.userToken.findFirst({
      where: {
        AND: [
          {
            credentialId
          },
          {
            tokenStatus
          }
        ]
      }
    })

    return result
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`[prisma]: ${error.message}`)
    }
    throw error
  }
}

export const getUserTokensWithTokenStatus = async (params: {credentialId: string, tokenStatus: TokenStatus}) => {
  const {credentialId, tokenStatus} = params
  try {
    const result = await prisma.userToken.findMany({
      where: {
        AND: [
          {
            credentialId
          },
          {
            tokenStatus
          }
        ]
      }
    })

    return result
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`[prisma]: ${error.message}`)
    }
    throw error
  }
}