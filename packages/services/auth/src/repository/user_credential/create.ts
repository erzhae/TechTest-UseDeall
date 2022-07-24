import { prisma } from './../../loader'
import type { UserRole } from '@prisma/client'
export const createUserCredential = async (data: {
  username: string
  password: string
  userRole: UserRole
}) => {
  try {
    const result = await prisma.userCredential.create({
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
