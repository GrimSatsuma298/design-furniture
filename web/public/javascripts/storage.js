var buttonBot = document.getElementById("chat-button");
var container = document.querySelector(".chat-container");
var chatbox = document.querySelector("#chatbox");
var content = buttonBot.nextElementSibling;

function saveSessionChat(userQ, botA) {
  // If sessionStorage messages DONT exist
  if (!sessionStorage.getItem("chats")) {
    // Creating array to save Q&A from user
    var messages = [];
    messages.push(userQ);
    messages.push(botA);
    // Transforming array to string and setting new session var
    sessionStorage.setItem("chats", JSON.stringify(messages));
  } else {
    var messages = JSON.parse(sessionStorage.getItem("chats"));
    messages.push(userQ);
    messages.push(botA);
    sessionStorage.setItem("chats", JSON.stringify(messages));
  }
}

function addChat() {
  var messages = JSON.parse(sessionStorage.getItem("chats"));
  if (messages) {
    // Show chat view
    content.style.display = "block";
    // Go to last bot response
    container.scrollTop = chatbox.scrollHeight;
    for (let i = 0; i < messages.length; i++) {
      if (i % 2 == 0) {
        var user =
          `<p id="userText" class="userText">
            <span>` +
          messages[i] +
          `</span>
          </p>`;
        $("#chatbox").append(user);
      } else {
        var bot =
          `<p id="botText" class="botText">
                <span>` +
          messages[i] +
          `</span>
              </p>`;
        $("#chatbox").append(bot);
      }
    }
  }
}

addChat();
