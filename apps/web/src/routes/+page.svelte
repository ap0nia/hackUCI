<script lang="ts">
  import { onMount } from "svelte";
  import Message from "$lib/Message.svelte";
  import { page } from "$app/stores";
  import { PUBLIC_WS } from "$env/static/public";

  let socket: WebSocket;

  function sendMessage(message: string) {
    if (socket.readyState <= 1) {
      socket.send(message);
    }
  }

  interface Message {
    message: string;
    mine: boolean;
    name: string;
  }

  export let messages: Message[] = [];
  
  let message = "";

  onMount(() => {
    socket = new WebSocket(`${PUBLIC_WS}?cookie=${JSON.stringify($page.data?.user)}`)

    // Connection opened
    socket.addEventListener("open", function (event) {
      console.log(event);
      console.log("It's open");
    });

    // Listen for messages
    socket.addEventListener("message", function (event) {
      const data = JSON.parse(event.data);
      console.log(data);
      console.log($page.data);
      const newMessage = {
        message: data.message.content,
        mine: $page.data.user?.id === data.user?.id,
        name: data.user?.name,
      };
      messages = [...messages, newMessage];
    });
  });

  function onSendMessage() {
    if (message.length > 0) {
      sendMessage(message);
      message = "";
    }
  }
</script>

<div id="mainmain">
  <div id="main">
    <div id="maina" />

    <div id="mainb">
      <div id="top-section">
        <dir> A session started by dean </dir>
      </div>
      <div id="chat">
        <div id="chatcontent">
          {#each messages as message}
            <Message
              message={message.message}
              mine={message.mine}
              name={message.name}
            />
          {/each}
          <div id="chatinput">
            <button class="_abl-" type="button"
              ><div class="_abm0 _abm1">
                <svg
                  aria-label="Emoji"
                  class="_ab6-"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                  ><path
                    d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"
                  /></svg
                >
              </div>
            </button>
            <div class="w-full flex justify-center rounded-full">
              <form on:submit={onSendMessage} class="w-full">
                <label class="w-full">
                  <input type="text" bind:value={message} class="w-full" />
                </label>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  #main {
    display: flex;
    width: 890px;
    left: 20%;
    position: absolute;
    justify-content: right;
    justify-self: center;
  }
  #maina {
    width: 300px;
    height: 800px;
    border-style: solid;
    border-width: 2px;
    border-color: black;
    background-color: white;
    margin-right: 4px;
    position: relative;
    right: 583px;
  }
  #mainb {
    height: 800px;
    border-width: 1px;
    width: 583px;
    position: absolute;
    background-color: white;
  }

  #top-section {
    height: 54px;
    width: auto;
    padding: 2px;
    border-color: black;
    border-style: solid;
    border-radius: 0.5em;
    margin-bottom: 5.1px;
    box-shadow: 0 0 0 6px #36393f;
  }

  #chat {
    height: 729px;
    width: 100%;
  }
  #chatcontent {
    height: 100%;
    margin-top: 4px;
    overflow-x: hidden;
    border-style: solid;
    overflow-y: scroll;
    background-color: white;
  }

  #chatinput {
    height: 34px;
    border-style: solid;
    border-color: black;
    position: absolute;
    border-width: 2px;
    z-index: 1;
    border-radius: 2em;
    bottom: 2%;
    width: 95%;
    text-align: center;
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  #input {
    height: 100%;
    width: 90%;
    margin-right: auto;
  }

  #chatinput button {
    border-style: hidden;
    background-color: white !important;
    position: relative;
    left: 6px;
    height: 80%;
  }
  ._abm0 {
    color: transparent !important;
  }
  @media screen and (max-width: 890px) {
    #main {
      left: 0%;
    }
  }
  @media screen and (min-width: 890px) {
    #main {
      right: 20%;
      margin-right: 20px;
    }
  }
</style>
