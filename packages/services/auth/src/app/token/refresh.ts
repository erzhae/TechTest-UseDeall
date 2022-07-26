import type {Request, Response} from 'express'
import { getUniqueUserCredentialById } from '../../repository/user_credential'
import { createUserToken, getUserTokensWithTokenStatus, getUserTokenWithTokenStatus, updateUserTokenStatus } from '../../repository/user_token'
import { createJwtToken, createRefreshToken } from '../../helper/token'

export default async (req: Request, res: Response) => {
  const params = req.body
  const {credentialId, refreshToken} = params
  if (!credentialId) {
    return res.status(400).json({
      code: 400,
      message: `Bad Input!`,
      data: null,
      errors: [`credentialId`, `required!`]
    })
  }

  if (!refreshToken) {
    return res.status(400).json({
      code: 400,
      message: `Bad Input!`,
      data: null,
      errors: [`refreshToken`, `required!`]
    })
  }

  try {
    const userCredential = await getUniqueUserCredentialById({id: credentialId})
    if (!userCredential) {
      return res.status(400).json({
        code: 400,
        message: `Bad Input!`,
        data: null,
        errors: [`credentialId`, `not found!`]
      })
    }

    const userTokens = await getUserTokensWithTokenStatus({credentialId, tokenStatus: 'ACTIVE'})
    if (!userTokens.length) {
      return res.status(400).json({
        code: 400,
        message: `Bad Input!`,
        data: null,
        errors: [`credentialId`, `haven't any active token!`]
      })
    }

    const userToken = userTokens.find((userToken) => userToken.refreshToken === refreshToken)
    if (!userToken) {
      return res.status(400).json({
        code: 400,
        message: `Bad Input!`,
        data: null,
        errors: [`refreshToken`, `invalid!`]
      })
    }

    const proceedRefreshToken = await updateUserTokenStatus({id: userToken.id, newTokenStatus: 'REFRESHED'})
    if (!proceedRefreshToken) {
      return res.status(500).json({
        code: 500,
        message: `Internal server error!`,
        data: null,
        errors: [`token`, `Error refreshing current token!`]
      })
    }


    const newRefreshToken = createRefreshToken({username: userCredential.username})
    const newJwtToken = createJwtToken({credentialId, username: userCredential.username, refreshToken, userRole: userCredential.userRole})

    if (!newRefreshToken || !newJwtToken) {
      return res.status(500).json({
        code: 500,
        message: `Internal server error!`,
        data: null,
        errors: ['token', `Error create token!`]
      })
    }

    const newUserToken = await createUserToken({credentialId, refreshToken: newRefreshToken, tokenStatus: 'ACTIVE', token: newJwtToken})

    return res.status(200).json({
      code: 200,
      message: `Success!`,
      data: {
        id: credentialId,
        username: userCredential.username,
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