import type { Actions } from './$types'
import { redirect } from '@sveltejs/kit'
import db from '$lib/db'

export const actions: Actions = {
  async default({ request, cookies }) {
    const email = (await request.formData()).get('email') as string
    const user = await db.user.create({
      data: {
        role: 'user',
        sessionid: 123,
        name: email,
        email
      }
    })

    cookies.set('user', JSON.stringify(user))

    throw redirect(307, '/')
  }
}
