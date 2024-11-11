socket.on('SERVER_SEND_SOCKET_ID', (data) => {
    console.log('User id ', data);
})


const messageContainer = document.querySelector('.message-container');
const form = document.querySelector('.chat-container form');
const input = form.querySelector('input');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (input.value) {
            socket.emit('CLIENT_SEND_MESSAGE', input.value);
            input.value = '';
        }
    });
}

socket.on('SERVER_RETURN_MESSAGE', (data) => {
    let ele = document.createElement('div');
    ele.classList.add('msg', 'inner-comming');
    ele.innerHTML = `<p>${data.content}</p>`;
    messageContainer.appendChild(ele);
    messageContainer.scrollTop = messageContainer.scrollHeight;
})
