importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyDN2WarbO5QRcTFnWeq1oKWdokZkipp0Q8",
    authDomain: "simplechatapp-17af2.firebaseapp.com",
    databaseURL: "https://simplechatapp-17af2-default-rtdb.firebaseio.com",
    projectId: "simplechatapp-17af2",
    storageBucket: "simplechatapp-17af2.appspot.com",
    messagingSenderId: "716535579361",
    appId: "1:716535579361:web:1144052a85bd7a358a2da0"
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
