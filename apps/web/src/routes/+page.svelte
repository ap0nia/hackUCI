<script lang="ts">
  import { page } from '$app/stores'
  import Chat from '$lib/Chat.svelte'
</script>

{#if $page.data.user}
  <Chat />
{:else}
  <p>You're not logged in</p>
{/if}
