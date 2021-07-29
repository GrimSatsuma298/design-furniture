var collap = document.getElementsByClassName("collapsible");
var closeChat = document.getElementsByClassName("close-tag");
console.log(collap)

// Collapse
for (let i = 0; i < collap.length; i++) {
  console.log("enter")
  collap[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;

    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      this.style.display = "none";
      closeChat[0].addEventListener("click", function () {
        content.style.maxHeight = null;

        collap[0].style.display = "inline";
      });
    }
  });
}


// Time
function getTime() {
    let today = new Date();
    hours = today.getHours();
    minutes = today.getMinutes();

    hours = hours < 10 ? hours="0"+hours : hours;
    minutes = minutes < 10 ? minutes="0"+minutes : minutes;

    let time = hours + ":" + minutes;
    return time;
}



function firstBotMessage(){
    let firstMessage = "Hello there";
    document.getElementById("botStarterMessage").innerHTML = '<p class="botText"><span>' + firstMessage + '</span></p>';

    let time = getTime();
    $("#chat-timestamp").append(time)
    document.getElementById("userInput").scrollIntoView(false);
}


function getHardResponse(userText){
    let botResponse = getBotResponse(userText);
    let botHTML = '<p class="botText"><span>' + botResponse + '</span></p>';
    $("#chatbox").append(botHTML);

    document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

function getResponse(){
    let userText = $("#textInput").val();
    userText = userText != "" ? userText : "Empty text";
    let userHTML = '<p class="userText"><span>' + userText + '</span></p>';
    $("#textInput").val("");
    $("#chatbox").append(userHTML);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);
    setTimeout(() => {
        getHardResponse(userText);
    }, 1000)

}

// Send user's text if button clicked
function sendButton(){
    getResponse();
}
// Or enter pressed
$("#textInput").keypress(function(e) {
    if(e.which == 13) {getResponse()}
})

// firstBotMessage();


