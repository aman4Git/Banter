const socket = io();
let name;
let textArea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');

do {
    name = prompt('Please enter your name: ');
} while (!name);

textArea.addEventListener('keyup', (e) => {
    if(e.key == 'Enter') {
        sendMessage(e.target.value)
    }
});

function sendMessage(message) {

    //Create message object
    let msg = {
        user   : name,
        message: message.trim(),
    }

    //Append message
    appendMessage(msg, 'outgoing');

    //clear text area after sending message
    textArea.value = '';

    //Scroll to bottom
    scrollToBottom();

    //send message to server
    socket.emit('message', msg);

}

//Append message
function appendMessage(msg, type) {

    //Create main div
    let mainDiv = document.createElement('div');

    //Add class
    let className = type;

    //Add class to main div
    mainDiv.classList.add(className, 'message');

    //Create mark up
    let markUp = `
        <h4> ${msg.user}</h4>
        <p>${msg.message}</p>
    `

    //Append mark up to main div
    mainDiv.innerHTML = markUp;

    //Append main div to message area
    messageArea.appendChild(mainDiv);
}

//Receive message
socket.on('message', (msg) => {

    //Append message
    appendMessage(msg, 'incoming');

    //Scroll to bottom
    scrollToBottom();
});

//Scroll to bottom
function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight;
}