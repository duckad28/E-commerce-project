const navItems = document.querySelectorAll('.nav li');

if(navItems) {
    navItems.forEach(item => {
        if (item.querySelector('a').classList.contains('active')) {

        } else {
            item.onmouseover = function(e) {
                let ele = item.querySelector('.line');
                ele.style.width  = '100px';
            }

            item.onmouseleave = function(e) {
                let ele = item.querySelector('.line');
                ele.style.width  = '0px';
            }
        }
    })
}

const books = document.querySelectorAll('.card');
if (books) {
    books.forEach((book) => {
        const ele = book.querySelector('.card-img-top');
        book.onmouseenter = function(e) {
            ele.style.transform = 'rotateY(-135deg) skewY(10deg)'
        }
        book.onmouseleave = function(e) {
            ele.style.transform = 'rotateY(0deg) skewY(0deg)'
        }
    })
}