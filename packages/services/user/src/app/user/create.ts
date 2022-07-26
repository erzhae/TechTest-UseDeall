import type { Request, Response } from 'express'
import type {JwtTokenPayload} from './../../model'
export default (req: Request, res: Response) => {
  // TODO: process endpoint if role granted /user/create there
  const tokenPayload = req.user as JwtTokenPayload

  if (tokenPayload.userRole !== 'ADMIN') {
    return res.status(403).json({
      code: 403,
      message: 'Forbidden!',
      data: null,
      errors: [ 'authorization', 'You dont have permission to access!']
    })
  }
}
