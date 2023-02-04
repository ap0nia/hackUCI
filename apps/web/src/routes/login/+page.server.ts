import type { Actions } from './$types'
import db from '$lib/db'

export const actions: Actions = {
  async default({ request, cookies }) {
    const email = (await request.formData()).get('email') as string
    const user = await db.user.findFirst({
      where: {
        email
      }
    })

    cookies.set('user', JSON.stringify(user))

    return user
  }
}
