import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, set, child, get  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBN0tdalbyYIuTNOaj-hqMKcpTTEQ79Hk8",
  authDomain: "blog-21ca0.firebaseapp.com",
  projectId: "blog-21ca0",
  storageBucket: "blog-21ca0.appspot.com",
  messagingSenderId: "192283611113",
  appId: "1:192283611113:web:0c6936eea8cba0ed270578"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const dbRef = ref(getDatabase(app));


const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const button = document.getElementById('signin');

//signin
button.addEventListener("click", async function() {
    isEmail(email_input.value).then(async(data) => {
      if(!data){
        //error
      }else{
        isPassword(password_input.value).then(async(data) => {
           if(!data){
            //error
           }else{
              getAuthaccountdatabase(email_input.value).then(async(data) => {
                if(!data){
                  await signUpFirebase(email_input.value, password_input.value);
                  await setAuthAccountdatabese(email_input.value, localStorage.getItem('uid'));
                  await setDataInDataBase(email_input.value, password_input.value)
                  window.location.href = 'profile.html'
                }else{
                  await signInFirebase(email_input.value, password_input.value);
                  window.location.href = '/index.html'
                }
              })
           }
        })
      }
    })
});

async function isEmail(email){
  const is = email.includes('@gmail.com');
  return new Promise((resolve) => {
  if(!is){
   alert('This Email is not valid!');
  }else{
    resolve(true);
  }
});
}
async function isPassword(password){
  const is = await password.length;
  return new Promise(resolve => {
    if(is >= 6){
      resolve(true);
    }else{
      alert('This password is too short!');
    }
  });
}
async function signUpFirebase(email, password){
     await createUserWithEmailAndPassword(auth, email, password).then(async(credential) => {
        await saveAuth("accessToken", credential.user.accessToken);
        await saveAuth("uid", credential.user.uid)
     }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`Error: ${errorMessage}
        Code: ${errorCode}`);
      });
}
async function signInFirebase(email, password) {
  await signInWithEmailAndPassword(auth, email, password).then(async (data) => {
    await saveAuth("accessToken", data.user.accessToken);
    await saveAuth("uid", data.user.uid)
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(`Error: ${errorMessage}
    Code: ${errorCode}`);
  });
}
async function saveAuth(name, value) {
  localStorage.setItem(name, value)
}
async function setDataInDataBase(email, password){
  set(ref(database, 'usersData/' +localStorage.getItem('uid')+'/auth'), {
    email: email, 
    password: password
  });
}
async function getDataInDatabase(authId){
  get(child(dbRef, `usersData/${authId}`)).then(async(snapshot) => {
    return new Promise(resolve => {
    if (snapshot.exists()) {
      const dataref = []
       dataref.email = snapshot.val().email;
       dataref.password = snapshot.val().password;
      resolve(dataref);
    } else {
      alert("No data available");
    }
  })
  }).catch((error) => {
    console.error(error);
  });    
}
async function setAuthAccountdatabese(email , authId){
  const email_name = email.split('@');
  const email_give_database = email_name[0]
  set(ref(database, 'users/' + email_give_database), {
    email: email,
    uid: authId
  });
}
async function getAuthaccountdatabase(email){
  const email_name = email.split('@');
  const email_give_database = email_name[0]
      return new Promise((resolve) => {
        get(child(dbRef, `users/${email_give_database}`)).then((snapshot) => {
          if (snapshot.exists()) {
            resolve(true);
          } else {
            resolve(false);
          }
        }).catch((error) => {
          alert(error)
        });
      })
}

