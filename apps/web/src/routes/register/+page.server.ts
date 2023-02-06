import type { Actions } from './$types'
import { redirect } from '@sveltejs/kit'
import db from '$lib/db'

export const actions: Actions = {
  async default({ request, cookies }) {
    const email = (await request.formData()).get('email') as string
    const user = await db.user.create({
      data: {
        role: 'user',
        name: email,
        email,
        session_id: 'global'
      }
    })

    cookies.set('user', 'j:' + JSON.stringify(user))

    throw redirect(302, '/')
  }
}
