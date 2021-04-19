//Make connection
const socket = io.connect('http://localhost:4000');

// console.log('conny', socket)

//Query the DOM, to make references 
const message = document.getElementById('message');
const handle = document.getElementById('handle');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

// Emit events

btn.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    let sender = btn.getAttribute('data-sender');
    sender = handle.value;
    console.log(handle);
    console.log(sender);
    message.value = '';
});

message.addEventListener('keypress', () => {
    socket.emit('typing',  handle.value);
});

//Listen for events

socket.on('chat', (data)=> {
    feedback.innerHTML = '';
    output.innerHTML += `<p><strong>${data.handle}</strong>: ${data.message}</p>`;
});

socket.on('typing', (data) => {
    feedback.innerHTML = `<p><em> ${data} is typing a message...</em></p>`;
});