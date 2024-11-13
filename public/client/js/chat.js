let username = document.querySelector('[chat-user-name]').getAttribute('chat-user-name');
socket.on('SERVER_SEND_SOCKET_ID', (data) => {
    id = data;
})


const messageContainer = document.querySelector('.message-container');
if (messageContainer) {
    messageContainer.scrollTop = messageContainer.scrollHeight;
}
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
    ele.classList.add('message');
    
    if (data.user == username) {
        ele.classList.add('inner-going');
        ele.innerText = data.content;
    } else {
        ele.classList.add('inner-coming');
        ele.innerHTML = `${data.content} <p>${data.user}</p>`
    }
    
    messageContainer.appendChild(ele);
    messageContainer.scrollTop = messageContainer.scrollHeight;
})
