<script lang="ts">
  import { goto } from '$app/navigation'

  let email = ''
  let error = ''

  async function success() {
    await goto('/')
    window.location.reload()
  }

  async function fail() {
    error = 'Invalid email'
  }

  function reset() {
    error = ''
  }

  async function submit() {
    const res = await fetch('http://localhost:3000/api/login', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({
        email
      })
    }).then(res => res.json())
    res.user ? success() : fail()
  }
</script>

{#if error}
  <div class="p-2">
    <div class="bg-red-400 p-4 rounded-xl flex justify-between">
      <p>{error}</p>
      <button class="w-8 h-8 bg-violet-800 text-violet-50 rounded-xl" on:click={reset}>X</button>
    </div>
  </div>
{/if}

<form on:submit|preventDefault={submit} class="p-4 max-w-2xl mx-auto">
  <fieldset class="p-4 border border-4 border-amber-400">
    <legend class="p-4 bg-green-400 rounded-xl font-bold">Start Here...</legend>
    <label class="">
      <p class="bg-violet-400 p-2 rounded rounded-b-none font-semibold">Email</p>
      <input type="text" class="border border-1 p-2 w-full rounded rounded-t-none" bind:value={email}>
    </label>
    <div class="w-full flex justify-center items-center my-4">
      <button class="bg-red-400 px-8 py-4 rounded-xl" on:click={submit}>
        Submit
      </button>
    </div>
  </fieldset>
</form>
