export interface JwtTokenPayload {
  credentialId: string
  username: string
  refreshToken: string
  userRole: string
}
