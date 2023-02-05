<script lang="ts">
  import { PUBLIC_API } from '$env/static/public'

  let email = "";

  function submit() {
    fetch(`${PUBLIC_API}/login`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }
</script>

<div class="form-container">
  <h1>Login to your account</h1>
  <form method="POST">
    <div id="imgcontainer">
      <img src="/favicon.png" alt="" />
    </div>
    <div class="form-group">
      <label for="email">Email:</label>
      <input placeholder="email" type="text" id="email" name="email" bind:value={email} />
    </div>
    <div class="flex justify-center">
      <button class="bg-green-400 rounded p-4 px-8 m-2">Submit</button>
    </div>
  </form>
</div>

<style>
  .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    margin: auto;
    position: absolute;
    top: 50%;
    bottom: 50%;
  }

  .form-container form {
    border-style: solid;
    border-width: 2px;
    border-radius: 3px;
    border-color: black;
  }

  .form-group {
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #imgcontainer {
    height: auto;
    width: auto;
    justify-content: center;

    margin-top: 10px;
  }
  #imgcontainer img {
    object-fit: cover;
    margin: auto;
    /*
    margin-left: auto;
    */
    height: 90px;
    width: 90px;
  }
  label {
    font-weight: bold;
  }

  input[type="text"],
  input[type="email"] {
    width: 200px;
    height: 30px;
    padding: 5px;
    font-size: 16px;
    margin: 4px;
  }
</style>
