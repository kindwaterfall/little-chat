const sendMessage = document.querySelector('.sendMessage');
const statusConnection = document.querySelector('.statusConnection');
const listMessages = document.querySelector('.messages');
const form = document.querySelector('.form');

const websocket = new WebSocket('ws://127.0.0.1:3000');

function setStatus(value) {
    statusConnection.textContent = value;
}

function print(value) {
    const elem = document.createElement('li');
    elem.textContent = value;
    listMessages.appendChild(elem);
}

form.addEventListener('submit', () => {
    event.preventDefault();
    if (sendMessage.value === '') {
        alert('Please enter a message');
    } else {
        websocket.send(sendMessage.value);
    }
    sendMessage.value = '';
});

websocket.onopen = () => setStatus('online');
websocket.onclose = () => setStatus('disconnect');
websocket.onmessage = (message) => print(message.data);