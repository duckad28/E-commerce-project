// Message flash
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

// Show subnav account
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


// Pagination
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
const buttonChooseIndexs = document.querySelectorAll('.page-item.page-item-enter-index');
if (buttonChooseIndexs) {
    buttonChooseIndexs.forEach(item => {
        let ele = item.querySelector('.input-box');
        let input = ele.querySelector('input');
        item.onclick = (e) => {
            
            if (ele.classList.contains('d-none')) {
                ele.classList.remove('d-none')
                
                input.focus();
                document.onkeydown = (ev) => {
                    if (ev.key == 'Enter') {
                        if (input == ev.target) {
                            let pageIndex = input.value;
                            if (pageIndex) {
                                let url = new URL(window.location.href);
                                let currentIndex = url.searchParams.get('index');
                                if (pageIndex == currentIndex) {
                    
                                } else {
                                    url.searchParams.set('index', pageIndex);
                                    window.location.href = url.href;
                                }
                            }
                        }
                    }
                }
            } else {
                ele.classList.add('d-none')
            }
            
        }
    })
}


// Delete item
const form = document.querySelector('[form-delete-item]');
const deleteItems = document.querySelectorAll('[button-delete]');
if (deleteItems && form) {
    const dataPath = form.getAttribute('data-path');
    deleteItems.forEach(item => {
        item.onclick = (e) => {
            let id = item.getAttribute('data-id');
            const answer = confirm('Do you want to delete this item?');
            if (answer) {
                form.action = dataPath + id + '?_method=DELETE';
                form.submit();
            }
        }
    })
}


// Search input
const inputSearch = document.querySelector('input.input-search')
const buttonSearch = document.querySelector('button.btn-search');
if(buttonSearch) {
    buttonSearch.onclick = (e) => {
        let search = (inputSearch.value);
        if (search) {
            let url = new URL(window.location.href);
            url.searchParams.set('search', search);
            url.searchParams.delete('index')
            window.location.href = url.href;
        }
    }
}

// Item's filter
const formSort = document.querySelector('[form-select-sort]');
if (formSort) {
    formSort.onchange = (e) => {
        let url = new URL(window.location.href);
        let [key, val] = e.target.value.split('-');
        if (key && val) {
            url.searchParams.set('skey', key);
            url.searchParams.set('svalue', val);
            window.location.href = url.href
        }
    }
}

const buttonStatuses = document.querySelectorAll('[button-item-status]');
if (buttonStatuses) {
    buttonStatuses.forEach(btn => {
        let url = new URL(window.location.href);
        btn.onclick = (e) => {
            let status = btn.getAttribute('data-status');
            if (status) {
                url.searchParams.set('status', status);
            } else {
                url.searchParams.delete('status');
            }
            window.location.href = url.href;
        }
    })
}

const buttonGenders = document.querySelectorAll('[button-item-gender]');
if (buttonGenders) {
    buttonGenders.forEach(btn => {
        let url = new URL(window.location.href);
        btn.onclick = (e) => {
            let status = btn.getAttribute('data-gender');
            if (status) {
                url.searchParams.set('gender', status);
            } else {
                url.searchParams.delete('gender');
            }
            window.location.href = url.href;
        }
    })
}

const formCreateAccount = document.querySelector('[form-create-account]');
if (formCreateAccount) {
    console.log(formCreateAccount);
    let inputImg = formCreateAccount.querySelector('input[type="file"]');
    let imgPreview = formCreateAccount.querySelector('.image-upload-preview');
    console.log(inputImg)
    inputImg.onchange = (e) => {
        let url = URL.createObjectURL(e.target.files[0]);
        imgPreview.src = url
    }
}

const inputPermissions = document.querySelectorAll('[input-permission]');
if (inputPermissions) {
    let ele = document.querySelector('input[name="permission"]');
    let permission = '';
    inputPermissions.forEach(item => {
        item.onchange = (e) => {
            if (e.target.checked == true) {
                permission += e.target.value + ", ";
            } else {
                let str = e.target.value + ", ";
                permission = permission.replace( str, "");
            }
            ele.value=permission
        }
    })
}

const formCreateProduct = document.querySelector('[form-create-product]');
if (formCreateProduct) {
    let inputImg = formCreateProduct.querySelector('input[type="file"]');
    let imgPreview = formCreateProduct.querySelector('.image-upload-preview');
    inputImg.onchange = (e) => {
        let url = URL.createObjectURL(e.target.files[0]);
        imgPreview.src = url
    }
}