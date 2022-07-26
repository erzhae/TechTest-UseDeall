import bcrypt from 'bcrypt'

export const create = (textToHash: string, saltOrRounds: string | number): string => {
  return bcrypt.hashSync(textToHash, saltOrRounds)
}

export const compare = (text: string, hashedText: string): boolean => {
  return bcrypt.compareSync(text, hashedText)
}

export default {create, compare}