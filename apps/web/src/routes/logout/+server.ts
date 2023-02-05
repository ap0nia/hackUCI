import { redirect } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ fetch, cookies }) => {
  const userCookie = cookies.get('user') || ''
  const userString = userCookie.startsWith('j:') ? userCookie.slice(2) : userCookie
  try {
    const user = JSON.parse(userString)
    await fetch('http://localhost:3000/api/logout', {
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
