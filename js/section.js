

const signIn = document.getElementById('signin-btn');
const signUp = document.getElementById('signup-btn');

signIn.addEventListener('click', function(){
    const signInDiv = document.getElementById('signin');
    const signUpDiv = document.getElementById('signup');
    signInDiv.classList.remove('hider')
    signUpDiv.classList.add('hider');
});
signUp.addEventListener('click', function(){
    const signInDiv = document.getElementById('signin');
    const signUpDiv = document.getElementById('signup');
    signUpDiv.classList.remove('hider');
    signInDiv.classList.add('hider');
})



