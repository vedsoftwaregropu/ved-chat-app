// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, query, orderByChild, startAt, endAt, get } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Firebase configuration
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

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get Realtime Database instance
const db = getDatabase(app);

// Get search input and results elements
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

// Event listener for search input
searchInput.addEventListener('input', async (event) => {
  const searchText = event.target.value.trim();
  if (searchText === '') {
    searchResults.innerHTML = ''; // Clear search results if the search input is empty
    return;
  }

  try {
    const querySnapshot = await getMatchingUsers(searchText);
    searchResults.innerHTML = ''; // Clear previous search results

    querySnapshot.forEach((snapshot) => {
      const user = snapshot.val();
      const userProfile = `
        <div class="user-profile">
          <p class="user-name">Name: ${user.name}</p>
          <p class="user-username">Username: ${user.username}</p>
        </div>
      `;
      searchResults.innerHTML += userProfile;
    });
  } catch (error) {
    console.error('Error searching for users:', error);
  }
});

// Function to search for users
async function getMatchingUsers(searchText) {
  const usersRef = ref(db, 'chat-app-users');
  const queryRef = query(usersRef, orderByChild('username'), startAt(searchText), endAt(searchText + "\uf8ff"));
  const querySnapshot = await get(queryRef);
  return querySnapshot;
}

searchInput.addEventListener('keyup', (event) => {
  const searchText = event.target.value.trim();
  if (searchText === '') {
    searchResults.classList.remove('fade-in');
    searchResults.classList.add('fade-out');
    setTimeout(() => {
      searchResults.innerHTML = '';
    }, 300); 
  }
});