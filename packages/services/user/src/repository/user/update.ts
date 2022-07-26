import { prisma } from './../../loader'

export const updateUserById = async (
  params: { id: string },
  data: { firstName?: string; lastName?: string; email?: string; phone?: string }
) => {
  try {
    return await prisma.user.update({
      where: params,
      data
    })
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`[prisma]: ${error.message}`)
    }
    throw error
  }
}

export const updateUserByUsername = async (
  params: { username: string },
  data: { firstName?: string; lastName?: string; email?: string; phone?: string }
) => {
  try {
    return await prisma.user.update({
      where: params,
      data
    })
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`[prisma]: ${error.message}`)
    }
    throw error
  }
}
