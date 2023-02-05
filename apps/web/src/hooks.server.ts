import type { HandleFetch } from '@sveltejs/kit'

/**
 * custom fetch hook for +page.ts load functions:
 * need to forward the cookies to make authorized requests to tRPC server
 */
export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
  /**
   * FIXME: restrict this to only the tRPC server, i.e. not ALL outgoing requests
   */
  request.headers.set('cookie', event.request.headers.get('cookie') || '')
  return fetch(request)
}
