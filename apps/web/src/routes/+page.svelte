<script lang="ts">
  import Message from '$lib/Message.svelte'

  export let messages = [
    {
      message: 'Gaming is epic',
      mine: true,
      name: 'VillV'
    },
    {
      message: 'Wine is epic',
      mine: false,
      name: 'Eden'
    }
  ]
</script>

{#each messages as message}
  <Message message={message.message} mine={message.mine} name={message.name} />
{/each}
