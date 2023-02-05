<script lang="ts">
  import '../app.css'
</script>
<header>
    <img src= "/favicon.png" alt= "logo" />
    <h1>UnderCover Boss</h1>
</header>


<slot />
<style>
    header {
      display: flex;
      align-items: center;
      font-size: 48px;
      font-weight: bold;
      color: rgb(139, 139, 239);
      background-color: rgb(65, 62, 62);
    }

    img {
        width: 100px;
        height: 100px;
    }
  </style>

<!--<h2>this is footer</h2>-->
