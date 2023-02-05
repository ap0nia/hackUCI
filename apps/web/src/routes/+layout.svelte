<script lang="ts">
  import '../app.css'
</script>
<header>
    <img src= "/favicon.png" alt= "logo" />
    <h1>UnderCover Boss</h1>
    <nav class="bg-red-600 ml-auto p-4 rounded">
      <ul class="flex gap-8">
        <li class="hover:color-blue-500"><a href="/">Home</a></li>
        <li class="hover:color-blue-500"><a href="/login">Login</a></li>
        <li class="hover:color-blue-500"><a href="/register">Register</a></li>
      </ul>
    </nav>
</header>


<slot />
<style>
    header {
      display: flex;
      align-items: center;
      background-color: rgb(65, 62, 62);
    }

    h1 {
      font-size: 48px;
      font-weight: bold;
      color: rgb(139, 139, 239);
    }

    img {
        width: 100px;
        height: 100px;
    }
  </style>

<!--<h2>this is footer</h2>-->
