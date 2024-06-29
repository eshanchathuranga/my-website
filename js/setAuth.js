const logoutFunction = document.getElementById('logout');
const formFunction = document.getElementById('form');

if (localStorage.getItem('uid')){
    formFunction.classList.add('hider')
} else {
    logoutFunction.classList.add('hider')
}