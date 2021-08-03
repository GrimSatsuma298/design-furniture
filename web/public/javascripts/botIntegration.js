var body = document.body;
// Calling chat funcionality scripts
var chatScript = document.createElement("script");
chatScript.src = "/javascripts/chat.js";
chatScript.type = "text/javascript";
chatScript.defer = true;
var resScript = document.createElement("script");
resScript.src = "/javascripts/responses.js";
resScript.type = "text/javascript";
resScript.defer = true;

// Creating empty div to append bot
var botTag = document.createElement("div");
botTag.className = "bot-component";
body.appendChild(botTag);

var botHTML = `
<!-- CHAT BAR BLOCK -->
<button id="chat-button" , type="button" class="collapsible">
  <img src="/images/logo.png" alt="" />
</button>
<div class="chat-bar-collapsible">
  <div class="chat-title">
    <span>EXO BOT</span>
    <div class="chat-settings">
      <button type="button" id="close-tag">
        <i class="far fa-times-circle"></i>
      </button>
    </div>
  </div>
  <!-- Messages -->
  <div class="chat-container">
    <div id="chatbox">
      <h5 id="chat-timestamp"></h5>
      <p id="botStarterMessage" class="botText">
        <span>Cargando...</span>
      </p>
    </div>
  </div>
  <!-- User input box -->
  <div class="chat-bar-input-block">
    <div id="userInput">
      <input
        type="text"
        id="textInput"
        class="input-box"
        name="msg"
        placeholder="Tap 'Enter' to send message"
      />
      <p></p>
    </div>

    <div class="chat-bar-icons">
      <i
        id="chat-icon"
        style="color: crimson"
        class="fa fa-fw fa-heart"
        onclick="heartButton()"
      ></i>
      <i
        id="chat-icon"
        style="color: #333"
        class="fa fa-fw fa-send"
        onclick="sendButton()"
      ></i>
    </div>
  </div>
  <div id="chat-bar-bottom">
    <p></p>
  </div>
</div>
  
`;
$(botHTML).appendTo(botTag);
$('head').append('<link rel="stylesheet" href="/stylesheets/chat.css" />')
body.appendChild(chatScript);
body.appendChild(resScript);
