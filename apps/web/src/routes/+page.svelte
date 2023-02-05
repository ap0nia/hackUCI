<script lang="ts">
  import { page } from '$app/stores'
  import { goto } from '$app/navigation'
  import Chat from '$lib/Chat.svelte'
  import { PUBLIC_API } from '$env/static/public'

  let session = ''

  async function submit() {
    const res = await fetch(`${PUBLIC_API}`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        session
      })
    }).then(res => res.json())
    console.log({res})
    await goto('/')
    window.location.reload()
  }
</script>

{#if $page.data.user?.session_id}
  <Chat />
{:else if $page.data.user}
  <form class="p-2" on:submit|preventDefault={submit}>
    <label>
      <span>Please enter a session</span>
      <input type="text" class="w-full rounded p-2" bind:value={session} />
    </label>
    <div class="w-full flex justify-center items-center my-2">
      <button class="bg-red-400 rounded px-8 py-2">Enter</button>
    </div>
  </form>
{:else}
  <p>You're not logged in</p>
{/if}
