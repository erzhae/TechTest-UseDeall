import { prisma } from './../../loader'

export const getUsers = async () => {
  try {
    return await prisma.user.findMany()
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`[prisma]: ${error.message}`)
    }
    throw error
  }
}

export const getUniqueUserByUsername = async (params: { username: string }) => {
  try {
    return await prisma.user.findUnique({
      where: params
    })
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`[prisma]: ${error.message}`)
    }
    throw error
  }
}

export const getUniqueUserById = async (params: { id: string }) => {
  try {
    return await prisma.user.findUnique({
      where: params
    })
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`[prisma]: ${error.message}`)
    }
    throw error
  }
}
