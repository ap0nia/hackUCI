import { redirect } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ cookies }) => {
  cookies.set('user', '', { path: '/', maxAge: 0 })
  throw redirect(307, '/login')
}
