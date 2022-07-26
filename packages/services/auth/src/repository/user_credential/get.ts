import { prisma } from './../../loader'
import type { TokenStatus } from '@prisma/client'

export const getUniqueUserCredentialByUsername = async (params: {
  username: string
}) => {
  try {
    const result = await prisma.userCredential.findUnique({
      where: params
    })

    return result
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`[prisma]: ${error.message}`)
    }
    throw error
  }
}

export const getUniqueUserCredentialById = async (params: {
  id: string
}) => {
  try {
    const result = await prisma.userCredential.findUnique({
      where: params
    })

    return result
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`[prisma]: ${error.message}`)
    }
    throw error
  }
}