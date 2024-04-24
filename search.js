// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, query, orderByChild, startAt, endAt, get } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDN2WarbO5QRcTFnWeq1oKWdokZkipp0Q8",
  authDomain: "simplechatapp-17af2.firebaseapp.com",
  databaseURL: "https://simplechatapp-17af2-default-rtdb.firebaseio.com",
  projectId: "simplechatapp-17af2",
  storageBucket: "simplechatapp-17af2.appspot.com",
  messagingSenderId: "716535579361",
  appId: "1:716535579361:web:1144052a85bd7a358a2da0"
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