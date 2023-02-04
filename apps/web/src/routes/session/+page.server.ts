import type { Actions } from './$types';
 
export const actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData()
    cookies.set('email', formData.get('email') as string)
  }
} satisfies Actions;