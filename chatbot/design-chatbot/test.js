const botTemplate = document.createElement('template');
botTemplate.innerHTML = `
    <style>
    * {
    box-sizing: border-box;
  }
  
  .chat-bar-collapsible {
    position: fixed;
    bottom: 10px;
    right: 50px;
    width: 350px;
  }
  
  .collapsible {
    background-color: rgba(247, 247, 247, 255);
    color: white;
    cursor: pointer;
    padding: 18px;
    text-align: left;
    outline: none;
    font-size: 18px;
  
    border: 3px solid white;
    border-radius: 50%;
  
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.5);
  
    width: 80px;
    height: 80px;
    margin-bottom: 40px;
    float: right;
  
    transition: display 1s ease-out;
  }
  .collapsible img {
    width: 52px;
    position: relative;
    bottom: 10px;
    right: 8px;
  }
  
  .content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s ease-out;
    background-color: #f1f1f1;
    border-radius: 10px 10px 0px 0px;
  }
  
  .full-chat-block {
    width: 350px;
    border-radius: 10px 10px 0px 0px;
    background-color: white;
    text-align: center;
    overflow: auto;
    scrollbar-width: none;
    border: none;
    height: max-content;
    transition: max-height 0.2s ease-out;
  }
  
  .outer-container {
    min-height: 500px;
    bottom: 0;
    position: relative;
    border-radius: 10px 10px 0px 0px;
  }
  
  .chat-title {
    display: flex;
    justify-content: space-between;
    background-image: linear-gradient(to right, #77c7b6, #f1873c);
    padding: 20px;
    text-align: left;
  }
  .close-tag {
    cursor: pointer;
    transition: display 1s ease-out;
    font-size: 20px;
  }
  
  
  .chat-container {
    max-height: 500px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    scroll-behavior: smooth;
    hyphens: auto;
  }
  
  .chat-container::-webkit-scrollbar {
    display: none;
  }
  
  .chat-bar-input-block {
    display: flex;
    float: left;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    background-color: rgb(137, 137, 137);
    border-radius: 10px 10px 0px 0px;
    padding: 10px 0px 10px 10px;
  }
  
  .chat-bar-icons {
    display: flex;
    justify-content: space-evenly;
    width: 25%;
    float: right;
    font-size: 20px;
  }
  
  #chat-icon:hover {
    opacity: 0.7;
  }
  
  /* Bubbles */
  
  #userInput {
    width: 75%;
  }
  
  .input-box {
    float: left;
    border: none;
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    font-size: 16px;
    color: black;
    background-color: white;
    outline: none;
  }
  
  .userText {
    color: white;
    font-family: Helvetica;
    font-size: 16px;
    font-weight: normal;
    text-align: right;
    clear: both;
  }
  
  .userText span {
    line-height: 1.5em;
    display: inline-block;
    background-color: #77c7b6;
    padding: 10px;
    border-radius: 8px;
    border-bottom-right-radius: 2px;
    max-width: 80%;
    margin-right: 10px;
    animation: floatup 0.5s forwards;
  }
  
  .botText {
    color: black;
    font-family: Helvetica;
    font-size: 16px;
    font-weight: normal;
    text-align: left;
  }
  
  .botText span {
    line-height: 1.5em;
    display: inline-block;
    background-color: #e0e0e0;
    padding: 10px;
    margin-left: 10px;
    border-radius: 8px;
    border-bottom-left-radius: 1px;
    max-width: 80%;
    margin-right: 10px;
    animation: floatup 0.5s forwards;
  }
  
  @keyframes floatup {
    from {
      transform: translateY(14px);
      opacity: 0;
    }
    to {
      transform: translateY(0px);
      opacity: 1;
    }
  }</style>
  <!-- CHAT BAR BLOCK -->
<div class="chat-bar-collapsible">
    <button id="chat-button" , type="button" class="collapsible">
      <img src="/images/logo.png" alt="">
    </button>

    <div class="content">
      <div class="full-chat-block">
        <!-- Message container -->
        <div class="outer-container">
          <div class="chat-title">
            <span>EXO BOT</span>
            <div class="chat-settings">
              <span class="close-tag"><i class="far fa-times-circle"></i></span>
            </div>
          </div>
          <div class="chat-container">
            
            <!-- Messages -->
            <div id="chatbox">
              <h5 id="chat-timestamp"></h5>
              <p id="botStarterMessage" class="botText">
                <span>Cargando...</span>
              </p>
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
        </div>
      </div>
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
  
    <script src="/js/responses.js" ></script>
    <script src="/js/chat.js" ></script>
    <script src="/js/test.js"></script>
  </div>

`;

class Bot extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'closed' });
    shadowRoot.appendChild(botTemplate.content);
  }
}

customElements.define('bot-component', Bot);