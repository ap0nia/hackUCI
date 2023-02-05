import type { Actions } from './$types';
 
export const actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData()
    cookies.set('sessionID', formData.get('sessionID') as string)
  }
} satisfies Actions;