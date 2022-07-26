import { prisma } from './../../loader'

export const deleteUserById = async (params: { id: string }) => {
  try {
    return await prisma.user.delete({
      where: params
    })
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`[prisma]: ${error.message}`)
    }
    throw error
  }
}

export const deleteUserByUsername = async (params: { username: string }) => {
  try {
    return await prisma.user.delete({
      where: params
    })
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`[prisma]: ${error.message}`)
    }
    throw error
  }
}
