/// <reference types="@sveltejs/kit" />

/**
 * @see {@link https://kit.svelte.dev/docs/types#app}
 */

interface User {
  id: number
  email: string
  name?: string
  role?: string
  session_id?: string
}

declare namespace App {
  interface Locals {}

  interface PageData {
    user?: User
  }

  interface Error {}
  interface Platform {}
}
