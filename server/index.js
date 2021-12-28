const socketio = require('socket.io');
const express = require('express');
const cors = require("cors");
const http = require('http');
const random = require('./utils/random')
const locations = require('./locations.json')


const app = express();
app.use(cors());
const server = http.createServer(app)

var players = [];
var playerVotes = {};
var playerRoles = {};
var voted = 0;
var spyName = null;

var setup = null;

const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    socket.on('join', (name) => {
        players.push(name);
        socket.join(name);

        io.emit('players', players);
    })
    socket.on('start', () => {
        setup = locations[Math.floor(Math.random() * locations.length)];
        roles = random.shuffle(setup.roles).slice(0, players.length - 1);
        roles.push('Spy');
        roles = random.shuffle(roles);

        for (i = 0; i < players.length; i++) {
            playerRoles[players[i]] = roles[i];
            playerVotes[players[i]] = 0;
            if (roles[i] === 'Spy') {
                spyName = players[i];
                io.in(players[i]).emit('role', 'Spy', 'Unknown');
            } else {
                io.in(players[i]).emit('role', roles[i], setup.location);
            }
        }
    })
    socket.on('reset', () => {
        players = [];
        playerRoles = {};
        playerVotes = {};
        voted = 0;
        io.emit('reset-response');
    })
    socket.on('vote', (name) => {
        playerVotes[name] += 1;
        voted += 1;

        var result = null;
        if (voted === players.length) {
            const spyVoted = playerVotes[spyName];
            for (i = 0; i < players.length; i++) {
                if (spyName !== players[i]) {
                    if (spyVoted <= playerVotes[players[i]]) {
                        result = 'Spy wins';
                    }
                }
            }
            if (!result) {
                result = 'Non-spies win';
            }
            io.emit('result', result);
        }
    })
})

const PORT = 8080;

server.listen(PORT, console.log(`Server started on port ${PORT}`));