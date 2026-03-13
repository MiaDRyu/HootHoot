const express = require('express');
const htttp = require ('http');
const {server} = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let gameState = {
    question: "¿Qn es la más sorra del DS51M?",
    options: ["Jazy", "Mia", "Elias", "Miguel"],
    correctAnswer: 2,
    players: {}
};

io.on('connection', (socket) => {
    console.log('Nuevo usuario conectado:', socket.id);

    socket.on('joinGame', (username) => {
        gameState.players[socket.id] = {name: username, score: 0};
        console.log(`${username} se ha unido.`);
        io.emit('updatePlayers', Object.values(gameState.players));
    });

    socket.on('sendAnswer', (answerIndex) => {
        if (answerIndex === gameState.correctAnswer) {
            gameState.players[socket.id].score += 100;
        }
        io.emit('playerAnswered', {id: socket.id})
    });

    socket.on('disconnect', () => {
        delete gameState.players[socket.id];
        io.emit('updatePlayers', Object.values(gameState.players));
    });
});

server.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});