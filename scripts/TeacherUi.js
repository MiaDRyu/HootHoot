const socket = io();
socket.emit('startHost');

socket.on('updatePlayers', (players => {
    const list = document.getElementById('player-list');
        list.innerHTML = players.map(p => `<div class="bg-white/20 p-2 rounded">${p.name}</div>`).join('');
}))