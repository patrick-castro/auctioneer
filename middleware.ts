export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/auction/:path*', '/deposit/:path*'],
}
