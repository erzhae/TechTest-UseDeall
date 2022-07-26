import type {Request, Response} from 'express'
import { JwtPayload } from 'jsonwebtoken'
import { getUserTokensWithTokenStatus, getUserTokenWithTokenStatus } from '../../repository/user_token'
import { verifyJwtToken } from '../../helper/token'

export default async (req: Request, res: Response) => {
  const params = req.params
  const {token} = params

  if (!token) {
    return res.status(400).json({
      code: 400,
      message: `Bad Input!`,
      data: null,
      errors: [`token`, `required!`]
    })
  }

  try {
    const verifiedJwt = verifyJwtToken(token)
    if (!verifiedJwt) {
      return res.status(400).json({
        code: 400,
        message: `Bad Input!`,
        data: null,
        errors: [`token`, `invalid!`]
      })
    }

    const {credentialId} = verifiedJwt as JwtPayload

    const userTokens = await getUserTokensWithTokenStatus({credentialId, tokenStatus: 'ACTIVE'})
    if (!userTokens.length) {
      return res.status(400).json({
        code: 400,
        message: `Bad Input!`,
        data: null,
        errors: [`credentialId`, `haven't any active token!`]
      })
    }

    const userToken = userTokens.find((userToken) => userToken.token === token)
    if (!userToken) {
      return res.status(401).json({
        code: 401,
        message: 'Authorization failed!',
        data: null,
        errors: ['Unauthorized!']
      })
    }

    return res.status(200).json({
      code: 200,
      message: 'Authorization Success!',
      data: verifiedJwt,
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