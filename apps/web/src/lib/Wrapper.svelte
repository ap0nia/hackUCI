<div id="main">
  <div id="maina" />
  <div id="mainb">
    <div id="top-section">
      <dir>A session started by dean</dir>
    </div>
    <div id="chat">
      <div id="chatcontent">
        <div id="chatinput">
          <button class="_abl-" type="button">
            <div class="_abm0 _abm1">
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
          <form id="input" action="/sendmessage" method="post">
            <textarea placeholder="message" name="userinput" id="uinput" cols="30" rows="10" />
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  #main {
    display: flex;
    width: 890px;
    right: 0px;
    position: absolute;
    justify-content: right;
  }

  #maina {
    width: 300px;
    height: 900px;
    border-style: solid;
    border-width: 2px;
    border-color: black;
    background-color: white;
    margin-right: 4px;
    position: relative;
    right: 583px;
  }

  #mainb {
    height: 900px;
    border-width: 1px;
    width: 583px;
    position: absolute;
    background-color: white;
  }

  #top-section {
    height: 59px;
    width: auto;
    padding: 2px;
    border-color: black;
    border-style: solid;
    border-radius: 0.5em;
    margin-bottom: 1.1px;
    box-shadow: 0 0 0 3px #36393f;
  }

  #chat {
    position: relative;
    height: 729px;
    width: 100%;
  }

  #chatcontent {
    height: 100%;
    overflow-x: hidden;
    border-style: solid;
    overflow-y: scroll;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
  }

  #chatinput {
    height: 34px;
    border-style: solid;
    border-color: black;
    position: absolute;

    z-index: 1 !important;
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
    margin-right: 5px;
  }

  #chatinput button {
    border-style: hidden;
    background-color: white !important;
    position: relative;
    left: 6px;
    height: 80%;
  }

  #chatinput textarea {
    height: 80%;
    width: 100%;
    margin-top: 2px;
    border: none;
    margin-right: 10px;
    margin-left: 8px;
    outline: none;
    position: relative;
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
