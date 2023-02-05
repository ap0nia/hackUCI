import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ cookies }) => {
  const userCookie = cookies.get('user') || ''
  const userString = userCookie.startsWith('j:') ? userCookie.slice(2) : userCookie
  try {
    const user = JSON.parse(userString)
    return { user }
  }
  catch {
    return {}
  }
}
