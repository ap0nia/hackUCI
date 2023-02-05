import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ cookies }) => {
  try {
    const user = JSON.parse(cookies.get('user') || '{}')
    console.log({user})
    return { user }
  }
  catch {
    return {
      user: null
    }
  }
}
