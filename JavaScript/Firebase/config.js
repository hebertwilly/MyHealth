import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDaARfZ5sQflC-1HU7dCAtL1W0SdEM7qJA",
  authDomain: "myhealth-295ee.firebaseapp.com",
  projectId: "myhealth-295ee",
  storageBucket: "myhealth-295ee.appspot.com",
  messagingSenderId: "211225414155",
  appId: "1:211225414155:web:c79a6be9dcbbd70891950e"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }