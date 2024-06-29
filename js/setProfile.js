import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, set, child, get  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getStorage, ref as firebaseRef, getDownloadURL, uploadBytes} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

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
const storage = getStorage(app);





const userImage = document.getElementById('user-img');
const userInputImage = document.getElementById('image-input');
const userNameInput = document.getElementById('name-input');
const userPasswordInput = document.getElementById('password-input');
const saveButton = document.getElementById('save');
// userImage.src="https://i.ibb.co/tBksYbw/logo.jpg"



saveButton.addEventListener('click', async() => {
  await setDataInDataBase(userNameInput.value);
  // const files = firebaseRef(storage, `${localStorage.getItem('uid')}.png`);
  // uploadBytes(files, userInputImage.value).then((snapshot) => {
  //   console.log('Uploaded a blob or file!');
  // });
  alert('Done!')
  getDataInDatabase(localStorage.getItem('uid'))

})





async function setDataInDataBase(name){
  set(ref(database, 'usersData/' + localStorage.getItem('uid')), {
    name: name
  });
}
async function getDataInDatabase(authId){
  get(child(dbRef, `usersData/${authId}`)).then(async(snapshot) => {
    return new Promise(resolve => {
    if (snapshot.exists()) {
      localStorage.setItem('name', snapshot.val().name)
    } else {
      alert("No data available");
    }
  })
  }).catch((error) => {
    console.error(error);
  });    
}
async function uploadPicToFirebase(image) {
    
}