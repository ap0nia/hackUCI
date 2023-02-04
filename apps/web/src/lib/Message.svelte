<script lang="ts">
  // TODO Dean: finish this component

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
    <div
      id="messagebox1"
      class="flex px-8 py-2 {mine ? 'bg-green-300' : 'bg-blue-300'}"
    >
      <div id="message">
        <h1>I am {name}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere in,
          hic molestias, sint corrupti amet dolores alias, commodi aliquid quae
          nam! Nihil maiores quasi vitae quis animi mollitia, excepturi impedit.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, voluptas
          quod. Neque temporibus veritatis natus culpa consequuntur unde, ullam
          dolores suscipit quis quasi cum voluptatem ea ex provident velit
          commodi. {message}
        </p>
      </div>
      <!-- using tailwindcss classes -->

      <!-- using HTML ID and styles below -->
    </div>
    <img
      src="/danger.jpeg"
      height="69"
      width="69"
      alt=""
      class="rounded-full"
    />
  </div>
{:else}
  <div id="messagebox22">
    <img
      id="profile"
      src="/whisper.jpeg"
      height="69px"
      width="69px"
      alt=""
      class="rounded-full"
    />

    <div
      id="messagebox2"
      class="flex px-8 py-2 {mine ? 'bg-green-300' : 'bg-blue-300'}"
    >
      <!-- using HTML ID and styles below -->

      <div id="message">
        <h1>Someone else is {name}</h1>
        <p>
          Someone else's message is Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Culpa ducimus in a unde repudiandae cumque ratione
          officia doloribus beatae odit nostrum nesciunt, ad fuga. Sequi
          temporibus ad quam est nam.{message}
        </p>
      </div>
    </div>
  </div>
{/if}

<style>
  #messagebox22 {
    width: 30%;
    margin-right: auto;
    display: flex;
  }

  #messagebox11 {
    width: 30%;
    margin-left: auto;
    display: flex;
  }
  #messagebox11 img {
    margin-left: 20px;
  }
  #messagebox1 {
    margin-left: auto;
    border-radius: 20px;
  }
  #messagebox2 {
    border-radius: 20px;
  }
  #messagebox11 img {
    margin-right: 20px;
    height: 69px;
  }
  #messagebox22 img {
    margin-left: 20px;
    height: 69px;
    margin-right: 20px;
  }
</style>
