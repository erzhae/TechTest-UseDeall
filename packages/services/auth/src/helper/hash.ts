import bcrypt from 'bcrypt'

export const create = (text: string): string => {
  return bcrypt.hashSync(text, 9)
}

export const compare = (text: string, hashedText: string): boolean => {
  return bcrypt.compareSync(text, hashedText)
}

export default {create, compare}