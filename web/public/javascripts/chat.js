var buttonBot = document.getElementById("chat-button");
var closeChat = document.getElementById("close-tag");
var title = document.getElementsByClassName("chat-title");
var container = document.querySelector(".chat-container");
var chatbox = document.querySelector("#chatbox");
var content = buttonBot.nextElementSibling;


// Collapse
buttonBot.onclick = ()=>{
  // Show chat view
  content.style.display = "block"; 
};

closeChat.onclick = ()=>{
  // Hide chat view
  content.style.display = "none";
};

// Time
function getTime() {
  let today = new Date();
  hours = today.getHours();
  minutes = today.getMinutes();

  hours = hours < 10 ? (hours = "0" + hours) : hours;
  minutes = minutes < 10 ? (minutes = "0" + minutes) : minutes;

  let time = hours + ":" + minutes;
  return time;
}

function firstBotMessage() {
  let firstMessage = "Hello there";
  document.getElementById("botStarterMessage").innerHTML =
    '<p class="botText"><span>' + firstMessage + "</span></p>";

  let time = getTime();
  $("#chat-timestamp").append(time);

}

function getHardResponse(userText) {
  let botResponse = getBotResponse(userText);
  let time = getTime();
  let timestamp = '<h5 id="chat-timestamp">' + time + "</h5>";
  let botHTML = '<p class="botText"><span>' + botResponse + "</span></p>";
  $("#chatbox").append(timestamp); // Adds the response hour
  $("#chatbox").append(botHTML);  container.scrollTop = chatbox.scrollHeight;
    // Go to last bot response
  container.scrollTop = chatbox.scrollHeight;


}

function getResponse() {
  let userText = $("#textInput").val();
  userText = userText != "" ? userText : "Empty text";
  let userHTML = '<p class="userText"><span>' + userText + "</span></p>";
  $("#textInput").val("");
  $("#chatbox").append(userHTML);
  // Loading response dots
  let loadDots =
    '<p id="loadingDots" class="botText"><span class="dot"><i class="fas fa-circle"></i><i class="fas fa-circle"></i><i class="fas fa-circle"></i></span></p>';
  $("#chatbox").append(loadDots);
  // Go to last user text
  container.scrollTop = chatbox.scrollHeight;

  setTimeout(() => {
    deleteLoadingDots();
    getHardResponse(userText);
  }, 2000);
}

function deleteLoadingDots() {
  $("#loadingDots").remove();
}

// Send user's text if button clicked
function sendButton() {
  getResponse();
}
// Or enter pressed
$("#textInput").keypress(function (e) {
  if (e.which == 13) {
    getResponse();
  }
});

firstBotMessage();
