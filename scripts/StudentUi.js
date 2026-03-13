const socket = io();

function join(){
    const name = document.getElementById('username').value;
    socket.emit('joinGame', name);
    document.getElementById('controls').style.display = 'block';
}

function answer(index){
    socket.emit('sendAnswer', index);
    alert("Respuesta enviada!");
}