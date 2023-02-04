import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ cookies }) => {
  const user = JSON.parse(cookies.get('user') || '')
  return { user }
}
