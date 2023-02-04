<script lang="ts">
  import { onMount } from 'svelte'
  import Message from '$lib/Message.svelte'
  import { page } from '$app/stores'
  import { PUBLIC_WS } from '$env/static/public'

  let socket: WebSocket

  function sendMessage(message: string) {
      if (socket.readyState <= 1) {
        socket.send(message);
      }
  }

  interface Message {
    message: string
    mine: boolean
    name: string
  }

  export let messages: Message[] = []

  let message = ''

  	onMount(() => {
      socket = new WebSocket(PUBLIC_WS);

      // Connection opened
      socket.addEventListener('open', function (event) {
          console.log(event)
          console.log("It's open");
      });

      // Listen for messages
      socket.addEventListener('message', function (event) {
        const data = JSON.parse(event.data);
        console.log(data)
        console.log($page.data)
        const newMessage = {
          message: data.message.content,
          mine: $page.data.user?.id === data.user?.id,
          name: data.user?.name
        }
        messages = [...messages, newMessage]
      });
    })
	
	function onSendMessage() {
		 if (message.length > 0) {
			 sendMessage(message);
			 message = "";
		 }
	}
</script>

{#each messages as message}
  <Message message={message.message} mine={message.mine} name={message.name} />
{/each}
<div class="w-full flex justify-center">
  <form on:submit={onSendMessage}>
    <label class="flex m-2">
      <input type="text" bind:value={message} class="full" />
      <button on:click={onSendMessage} class="bg-red-300 rounded p-2 m-2">
      	Send Message
      </button>
    </label>
  </form>
</div>
