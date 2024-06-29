const userName = document.getElementById('user');

userName.innerHTML += `${localStorage.getItem('name')}`