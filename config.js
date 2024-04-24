import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js"
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js"
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Database connection object 
const firebaseConfig = {
  apiKey: "AIzaSyBrIGd6lyRgRvTNE-Htt3gJO_Uy8PNI6bU",
  authDomain: "ved-chat-app.firebaseapp.com",
  databaseURL: "https://ved-chat-app-default-rtdb.firebaseio.com",
  projectId: "ved-chat-app",
  storageBucket: "ved-chat-app.appspot.com",
  messagingSenderId: "621867816996",
  appId: "1:621867816996:web:b17c33f53820457940a0b1",
  measurementId: "G-E22RS25EQ3"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app)
const storage = getStorage(app);
export { db }


