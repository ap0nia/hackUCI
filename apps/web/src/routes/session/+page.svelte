<form method="POST">
    <img src="/danger.jpeg" height="69" width="69" alt="" class="rounded-full" />
    <div>
        <label for="Session id" class="this">
            <p>Session Id</p>
            <input placeholder="Session id" name="sessionID" type="text" class="rounded">
          </label>
          <button class="bg-blue-400 rounded p-2">Join game</button>
          <label for="Session id" class="this">
          </label>
          <div class="dropdown">
            <div>
            <button>Role</button>
          </div>
            <div class="dropdown-content">
                <a href="#">Boss</a>
                <a href="#">Employee</a>
            </div>
        </div>
    </div>
</form>
<style>
    div{
        background-color: rgb(148, 166, 189);
        border-style: solid;
        border-color:black ;
        border-width: 2px;
        border-radius:4px;
    }
    p {
        margin-left: 12px;
    }
    form {
        display: flex;
        height: 100vh;
        justify-content: center;
        align-items: center ;
        background-color: rgb(65, 62, 62);
    }
    label {
        margin-left:4px;
        margin-right:4px;
        color: pink;
        font-weight: 500;
    }

    input {
        margin-left:4px;
        color: black;
        margin-bottom: 4px;
    }

    .dropdown button {
        color: pink;
        margin-right: 3px;
        margin-top: 3px;
        margin-bottom: 3px;;
        border-style:solid;
        border-color:black;
        
    }

    .dropdown {
    
        position:relative;
        border-style: none;
        display:block;
        text-align: center;
        margin-right: 2px;
        margin-left: 2px;
        margin-bottom: 2px;
    }

    .dropdown-content {
        display: none;
        position: center;
        z-index: 1;
        background-color: lightgray;
        top: 100%;
        left: 0;
    }

    .dropdown:hover .dropdown-content {
        display: block;
    }

    .dropdown-content a {
        display: block;
        padding: 1em;
        text-decoration: none;
        color: black;
    }

  </style>
  


