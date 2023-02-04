<script lang="ts">
  import { onMount } from 'svelte'
  import Message from '$lib/Message.svelte'

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
  let userID = 1

  	onMount(() => {
      socket = new WebSocket('ws://localhost:3000/chat');

      // Connection opened
      socket.addEventListener('open', function (event) {
          console.log(event)
          console.log("It's open");
      });

      // Listen for messages
      socket.addEventListener('message', function (event) {
        const data = JSON.parse(event.data);
        const newMessage = {
          message: data.message.content,
          mine: data.useriD === userID,
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

<input type="text" bind:value={message} />
<button on:click={onSendMessage}>
	Send Message
</button>
{#each messages as message}
  <Message message={message.message} mine={message.mine} name={message.name} />
{/each}
