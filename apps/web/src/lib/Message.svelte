<script lang="ts">
  // TODO Dean: finish this component

  /**
   * @prop the message to show
   */
  export let message = ''

  /**
   * @prop whether the message belongs to the current user
   */
  export let mine = true

  /**
   * @prop the user's name
   */
  export let name = 'Aponia'
</script>

<!-- @component renders a single message for a user -->

<div class="flex rounded-full m-4 px-8 py-2 {mine ? 'bg-green-300' : 'bg-blue-300'}">
  {#if mine}
    <div>
      <h1>I am {name}</h1>
      <p>My message is {message}</p>
    </div>
    <!-- using tailwindcss classes -->
    <img src="/danger.jpeg" height="69" width="69" alt="" class="rounded-full ml-auto">
  {:else}
    <!-- using HTML ID and styles below -->
    <img id="message" src="/whisper.jpeg" height="69" width="69" alt="">
    <div>
      <h1>Someone else is {name}</h1>
      <p>Someone else's message is {message}</p>
    </div>
  {/if}
</div>

<style>
  #message {
    border-radius: 9999px;
    overflow: hidden;
    margin-right: auto;
  }
</style>

