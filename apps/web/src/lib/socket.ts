import { PUBLIC_WS } from '$env/static/public'
import { browser } from '$app/environment'

export let socket = browser ? new WebSocket(`${PUBLIC_WS}`) : null
