import { TokenStatus } from '@prisma/client'
import {prisma} from './../../loader'

export const updateUserTokenStatus = async (params: {id: string,  newTokenStatus: TokenStatus}) => {
  const {id, newTokenStatus} = params
  try {
    const result = await prisma.userToken.update({
      where: {
        id
      },
      data: {
        tokenStatus: newTokenStatus
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