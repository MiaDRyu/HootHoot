const socket = io();
socket.emit('startHost');

document.getElementById('quizFile').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const questions = JSON.parse(event.target.result);
        socket.emit('uploadQuiz', questions);
        alert("Preguntas cargadas")
    };
    reader.readAsText(e.target.files[0]);
});

socket.on('updatePlayers', (players) => {
    const list = document.getElementById('player-list');
        list.innerHTML = players.map(p => `<div class="bg-white/20 p-2 rounded">${p.name}</div>`).join('');
});

function startQuiz(){
    socket.emit('requestNextQuestion');
    document.getElementById('lobby').classList.add('hidden');
    document.getElementById('game-screen').classList.add('hidden');
}

socket.on('displayQuestionHost', (q) => {
    document.getElementById('question-text').innerText = q.pregunta;
    q.opciones.forEach((opt, i) => {
        document.getElementById(`opt${i}`).innerText = opt;
    });
});