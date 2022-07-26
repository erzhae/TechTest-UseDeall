import { prisma } from './../../loader'

export const createUser = async (data: {
  username: string
  firstName: string
  lastName?: string
  email?: string
  phone?: string
}) => {
  try {
    return await prisma.user.create({
      data
    })
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`[prisma]: ${error.message}`)
    }
    throw error
  }
}
