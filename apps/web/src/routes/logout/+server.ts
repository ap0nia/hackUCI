import { redirect } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { PUBLIC_API } from '$env/static/public'

export const GET: RequestHandler = async ({ fetch, cookies }) => {
  const userCookie = cookies.get('user') || ''
  const userString = userCookie.startsWith('j:') ? userCookie.slice(2) : userCookie
  try {
    const user = JSON.parse(userString)
    await fetch(`${PUBLIC_API}/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: user.email })
    })
  }
  catch {
  }
  cookies.set('user', '', { path: '/', maxAge: 0 })
  throw redirect(307, '/login')
}
