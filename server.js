const Websocket = require('ws');
const http = require('http');

const info = {
    hostname: '127.0.0.1',
    port: 3000
}

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
});
server.listen(info.port, info.hostname, () => {
    console.log(`Server is runnnig: ${info.hostname}:${info.port}`);
})

const websocket = new Websocket.Server({ server });

websocket.on('connection', socket => {
    socket.on('message', message => {
        if (message === '.exit') {
            websocket.close();
        }
        websocket.clients.forEach(client => {
            if (client.readyState === Websocket.OPEN) {
                client.send(message);
            }
        });
    });

    socket.send('Welcome to chat!');
})