importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging.js');

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

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

self.addEventListener('push', (event) => {
    const data = event.data.json();

    const options = {
        body: data.body,
        icon: 'image.png',
        badge: 'image.png',
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    // Add your logic here for handling notification clicks
});
