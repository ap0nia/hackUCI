<script lang="ts">
  import Icon from '@iconify/svelte'
  import CloseIcon from '@iconify/icons-mdi/arrow-up-thin'
  import { page } from '$app/stores'
  import { onMount } from 'svelte'

  import { socket } from '$lib/socket'

  interface Message {
    user_id: number
    user: string
    content: string
    mine?: boolean
  }

  interface User {
    user_id: number
    user: string
  }

onMount(() => {
  socket.addEventListener("open", function (event) {
      console.log(event);
      console.log("It's open");
    });

    socket.addEventListener("message", function (event) {
      console.log('data', event.data)
      try {
      const data = JSON.parse(event.data);
      const newMessage: Message = {
        user_id: data.user?.id || 1,
        content: data?.message?.content || '',
        mine: $page.data.user?.id === data?.user?.id || false,
        user: data.user?.name || 'anonymous',
      };
      messages = [...messages, newMessage];
      message = ''
      } catch {
        console.log('error')
      }
    })
  });


  export let users: User[] = [
    {
      user_id: 13,
      user: 'aponia'
    },
    {
      user_id: 1,
      user: 'VillV'
    }
  ]

  export let messages: Message[] = [
    {
      user_id: 13,
      user: 'aponia',
      content: 'NO gamer words'
    },
    {
      user_id: 1,
      user: 'VillV',
      content: 'YES gamer words'
    }
  ]

  let message = ''
  let input: HTMLInputElement

  function submit() {
    if (socket.readyState <= 1) {
      socket.send(`MESSAGE: ${message}`);
    }
    input.focus()
  }
</script>

<div class="flex">
  <div class="w-52 border border-purple-400 border-4 rounded-xl">
    {#each users as user}
      <div class="flex gap-2 p-2 hover:bg-slate-500 hover:cursor">
        <div class="h-12 w-12 rounded-full overflow-hidden">
          <img id="profile" src="/whisper.jpeg" height="32" width="32" alt="" class="w-full h-full"/>
        </div>
        <div class="flex flex-col justify-center">
          <h1 class="font-semibold text-xl">{user.user}</h1>
          <div class="flex items-center gap-1">
            <div class="rounded-full bg-green-300 w-2 h-2" />
            <p class="text-sky-700">Online</p>
          </div>
        </div>
      </div>
    {/each}
  </div>
  
  <div class="w-full">
    <div class="flex flex-col gap-4 p-2">
      {#each messages as message}
        {#if message.user_id === $page.data?.user?.id}
          <div class="flex gap-2">
            <div class="bg-green-400 rounded-2xl p-2 w-full">
              <h1 class="font-semibold text-xl">{message.user}</h1>
              <p>{message.content}</p>
            </div>
            <div class="h-12 w-12 rounded-full overflow-hidden">
              <img id="profile" src="/whisper.jpeg" height="32" width="32" alt="" class="w-full h-full"/>
            </div>
          </div>
        {:else}
          <div class="flex gap-2">
            <div class="h-12 w-12 rounded-full overflow-hidden">
              <img id="profile" src="/danger.jpeg" height="32" width="32" alt="" class="w-full h-full"/>
            </div>
            <div class="bg-blue-400 rounded-2xl p-2 w-full">
              <h1 class="font-semibold text-xl">{message.user}</h1>
              <p class="whitespace-wrap">{message.content}</p>
            </div>
          </div>
        {/if}
      {/each}
    </div>
    
    <form on:submit|preventDefault={submit}>
      <label class="flex gap-2 p-4">
        <input class="w-full rounded-xl p-2 h-16" bind:value={message} bind:this={input} />
        <div class="flex items-center">
          <div class="border rounded-full bg-purple-400">
            <button class="flex">
              <Icon icon={CloseIcon} height="40px" color="white" />
            </button>
          </div>
        </div>
      </label>
    </form>
  </div>
</div>
