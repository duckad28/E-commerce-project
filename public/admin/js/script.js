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


const accountAvatar = document.querySelector('.account .account-avatar');
if (accountAvatar) {
    const subnav = document.querySelector('.account-subnav');
    const closeSubnav = subnav.querySelector('button');
    accountAvatar.onclick = (e) => {
        subnav.classList.toggle('show')
    }

    closeSubnav.onclick = (e) => {
        subnav.classList.remove('show');
    }
}

const pageItems = document.querySelectorAll('[data-page-index]');
if (pageItems) {
    pageItems.forEach(item => {
        item.onclick = (e) => {
            let pageIndex = parseInt(item.getAttribute('data-page-index'));
            let url = new URL(window.location.href);
            let currentIndex = url.searchParams.get('index');
            if (pageIndex == currentIndex) {

            } else {
                url.searchParams.set('index', pageIndex);
                window.location.href = url.href;
            }
        }
    })
}