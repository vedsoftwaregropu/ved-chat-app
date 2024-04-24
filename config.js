import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js"
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js"
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Database connection object 
const firebaseConfig = {
  apiKey: "AIzaSyDN2WarbO5QRcTFnWeq1oKWdokZkipp0Q8",
  authDomain: "simplechatapp-17af2.firebaseapp.com",
  databaseURL: "https://simplechatapp-17af2-default-rtdb.firebaseio.com",
  projectId: "simplechatapp-17af2",
  storageBucket: "simplechatapp-17af2.appspot.com",
  messagingSenderId: "716535579361",
  appId: "1:716535579361:web:1144052a85bd7a358a2da0"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app)
const storage = getStorage(app);
export { db }


