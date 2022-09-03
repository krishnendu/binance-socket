import fetch from 'node-fetch';

let clients = [];

export function eventsHandler(request, response, next) {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    response.writeHead(200, headers);
    response.write(`\n`);
    console.log('Connected');

    const clientId = Date.now();
    const newClient = {
        id: clientId,
        response
    };
    clients.push(newClient);

    request.on('close', () => {
        console.log(`${clientId} Connection closed`);
        clients = clients.filter(client => client.id !== clientId);
    });
}

export function fetchBinance() {    
    fetch(process.env.BINANCE_API)
    .then(response => response.json())
    .then(sendEventsToAll)
    .catch(err => console.error(err));

    setTimeout(fetchBinance, 5000);
}

export function getStatus(req, res) {
    res.json({clients: clients.length});
}

function sendEventsToAll(coinData) {
    clients.forEach(client => {
        client.response.write(`data: ${JSON.stringify(coinData)}\n\n`);
    });
}
