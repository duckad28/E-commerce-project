const message = document.querySelector('[duration]');
if (message) {
    const closeMess = message.querySelector('.close');
    const duration = parseInt(message.getAttribute('duration'));
    closeMess.onclick = (e) => {
        message.style.animation = 'messageSlideOut linear .5s  forwards';
    }
    setTimeout(() => {        
        message.style.animation = 'messageSlideOut linear .5s  forwards';
    }, duration)
}