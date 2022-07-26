import type {Request, Response} from 'express'
import hash from '../../helper/hash'
import { getUniqueUserCredentialByUsername } from '../../repository/user_credential'
import { createUserToken, getUserTokenWithTokenStatus, updateUserTokenStatus } from '../../repository/user_token'
import { createJwtToken, createRefreshToken } from '../../helper/token'

export default async (req: Request, res: Response) => {
  const params = req.body
  const {username, password} = params
  if (!username) {
    return res.status(400).json({
      code: 400,
      message: `Bad Input!`,
      data: null,
      errors: [`username`, `required!`]
    })
  }

  if (!password) {
    return res.status(400).json({
      code: 400,
      message: `Bad Input!`,
      data: null,
      errors: [`password`, `required!`]
    })
  }

  try {
    const userCredential = await getUniqueUserCredentialByUsername({username: username})
    
    if (!userCredential) {
      return res.status(400).json({
        code: 400,
        message: `Bad Input!`,
        data: null,
        errors: [`username`, `Username ${username} not registered`]
      })
    }

    const {id: credentialId, password: credentialPassword, username: credentialUsername, userRole: credentialUserRole} = userCredential

    const isPasswordCorrect = hash.compare(password, credentialPassword)
    if (!isPasswordCorrect) {
      return res.status(400).json({
        code: 400,
        message: 'Bad Input!',
        data: null,
        errors: ['password', `Wrong ${password}!`]
      })
    }

    const userToken = await getUserTokenWithTokenStatus({credentialId, tokenStatus: 'ACTIVE'})

    const proceedUserToken = userToken ? await updateUserTokenStatus({id: userToken.id, newTokenStatus: 'REPLACED'}) : true
    if (!proceedUserToken) {
      return res.status(500).json({
        code: 500,
        message: `Internal server error!`,
        data: null,
        errors: [`token`, `Error replacing current token!`]
      })
    }

    const refreshToken = createRefreshToken({username: credentialUsername})
    const jwtToken = createJwtToken({credentialId, username: credentialUsername, refreshToken, userRole: credentialUserRole})
    if (!refreshToken || !jwtToken) {
      return res.status(500).json({
        code: 500,
        message: `Internal server error!`,
        data: null,
        errors: ['token', `Error create token!`]
      })
    }

    const newUserToken = await createUserToken({credentialId, refreshToken, tokenStatus: 'ACTIVE', token: jwtToken})

    return res.status(200).json({
      code: 200,
      message: `Sign In Success!`,
      data: {
        id: credentialId,
        username,
        authToken: newUserToken.token
      },
      errors: null
    })

  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Internal server error!',
      data: null,
      errors: [error instanceof Error ? error.message : error]
    })
  }
}