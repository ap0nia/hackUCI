<script lang="ts">
  import '../app.css'
  import { page } from '$app/stores'
</script>

<header class="bg-gradient-to-r from-slate-400 to-violet-200 h-20 flex gap-8 p-4">
  <a href="/" class="flex justify-center items-center gap-4">
    <img src="/favicon.png" height="40" width="40" alt="">
    <h1 class="text-purple-700 text-5xl font-bold whitespace-nowrap">Bossus Amogus</h1>
  </a>
  <nav class="flex flex-auto justify-end items-center">
    <ul class="flex gap-4">
      <li class="text-purple-700 hover:text-green-800 font-semibold"><a href="/">Home</a></li>
      {#if $page.data.user}
        <li class="text-purple-700 hover:text-green-800 font-semibold"><a href="/join">Join</a></li>
        <li class="text-purple-700 hover:text-green-800 font-semibold"><a href="/logout">Logout</a></li>
      {:else}
        <li class="text-purple-700 hover:text-green-800 font-semibold"><a href="/login">Login</a></li>
        <li class="text-purple-700 hover:text-green-800 font-semibold"><a href="/register">Register</a></li>
      {/if}
    </ul>
  </nav>
  {#if $page.data.user}
    <div class="w-15 flex">
      <img src="porridge.jpeg" alt="" height="40" width="40" class="h-full w-full rounded-full">
    </div>
  {/if}
</header>

<main class="min-h-screen bg-gradient-to-b from-slate-400 to-violet-300">
  <slot />
</main>

<header class="bg-sky-400 h-20">
  <nav>
    <ul>
      <li>3</li>
    </ul>
  </nav>
</header>
