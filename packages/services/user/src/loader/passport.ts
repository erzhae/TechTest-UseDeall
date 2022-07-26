import passport from 'passport'
import PassportJwt from 'passport-jwt'
import { env } from '../conf'

const { Strategy, ExtractJwt } = PassportJwt

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.jwtSecret
    },
    async (payload, done) => {
      try {
        // TODO: invoke authorize on repository auth

        // const userToken = await getUserTokenWithTokenStatus({credentialId: payload.credentialId, tokenStatus: 'ACTIVE'})
        // if (!userToken) {
        //   return done(`user token not found!`)
        // }

        // const user = await getUniqueUserCredentialById({id: userToken.credentialId})
        return done(null, payload)
      } catch (error) {
        return done(error)
      }
    }
  )
)

export default passport
