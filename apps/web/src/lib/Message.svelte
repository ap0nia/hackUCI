<script lang="ts">
  /**
   * @prop the message to show
   */
  export let message = "";

  /**
   * @prop whether the message belongs to the current user
   */
  export let mine = true;

  /**
   * @prop the user's name
   */
  export let name = "Aponia";
</script>

<!-- @component renders a single message for a user -->

{#if mine}
  <div id="messagebox11">
    <div id="messagebox1" class="{mine ? 'bg-green-300' : 'bg-blue-300'}">
      <div>
        <h1 class="underline">{name}</h1>
        <p>{message}</p>
      </div>
    </div>
    <img src="/danger.jpeg" height="69" width="69" alt="" class="rounded-full" />
  </div>
{:else}
  <div id="messagebox22">
    <img id="profile" src="/whisper.jpeg" height="69" width="69" alt="" />
    <div id="messagebox2" class="{mine ? 'bg-green-300' : 'bg-blue-300'}">
      <div>
        <h1 class="underline">{name}</h1>
        <p>{message}</p>
      </div>
    </div>
  </div>
{/if}

<style>
  #messagebox1 {
    display: flex;
    padding-inline: 8px;
    padding-block: 24px;
    margin-left: auto;
    border-radius: 20px;
  }

  #messagebox11 {
    width: 30%;
    margin-left: auto;
    display: flex;
  }

  #messagebox11 img {
    margin-left: 20px;
  }

  #messagebox11 img {
    border-radius: 9999px;
    margin-right: 20px;
    height: 69px;
  }

  #messagebox2 {
    display: flex;
    padding-inline: 8px;
    padding-block: 24px;
    margin-right: auto;
    border-radius: 20px;
  }

  #messagebox22 {
    width: 30%;
    margin-right: auto;
    display: flex;
  }

  #messagebox22 img {
    border-radius: 9999px;
    margin-left: 20px;
    margin-right: 20px;
    height: 69px;
  }
</style>
