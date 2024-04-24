import { db } from "/config.js";
import { ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import { ref as databaseRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";
import { ref as storageRef, getStorage } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";


document.addEventListener("DOMContentLoaded", async () => {
    // ALL REQUIRED ELEMENTS 
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button");
    const logoutButton = document.getElementById("logout-button");
    const messageContainer = document.getElementById("messages");
    const videoInput = document.getElementById('video-input');

    //image
    const imageInput = document.getElementById('image-input');
    // LOGOUT BUTTON
    // Initialize Firebase Storage
    const storage = getStorage();

    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("name");
        localStorage.removeItem("status");
        window.location.href = "index.html";

    });

    // Function to handle video upload
    const handleVideoUpload = (file) => {
        const storageReference = storageRef(storage, `videos/${file.name}`);
        const uploadTask = uploadBytesResumable(storageReference, file);

        document.getElementById('img-status').style.color = '#1d53aa';
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                console.error('Error uploading video:', error.message);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    saveVideoToDatabase(downloadURL);
                });
            }
        );
    };

    // Function to handle file input change for videos
    const handleVideoInputChange = (input) => {
        var toast = document.getElementById('toast');

        // Check if a video is selected
        if (input.files.length > 0) {
            toast.style.display = 'block';

            // Hide the toast after 3 seconds
            setTimeout(function () {
                toast.style.display = 'none';
            }, 3000);
        }
    };

    // Function to save video URL to database
    const saveVideoToDatabase = (downloadURL) => {
        const name = localStorage.getItem('name');
        const messagesRef = ref(db, 'messages');
        push(messagesRef, {
            name: name,
            videoUrl: downloadURL,
            timestamp: new Date().getTime(),
        });
    };

    // Image Upload
    const handleImageUpload = (file) => {
        const storageReference = storageRef(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageReference, file);

        document.getElementById('img-status').style.color = '#1d53aa'
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                console.error('Error uploading image:', error.message);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    saveImageToDatabase(downloadURL);
                });
            }
        );
    };

    function handleFileInputChange(input) {
        var toast = document.getElementById('toast');

        // Check if an image is selected
        if (input.files.length > 0) {
            toast.style.display = 'block';

            setTimeout(function () {
                toast.style.display = 'none';
            }, 3000);
        }
    }

    const sendMessage = () => {
        const name = localStorage.getItem('name');
        const message = messageInput.value.trim();

        if (name && (message || imageInput.files.length > 0 || videoInput.files.length > 0)) {
            if (imageInput.files.length > 0) {
                const imageFile = imageInput.files[0];
                handleImageUpload(imageFile);
                imageInput.value = '';
            } else if (videoInput.files.length > 0) {
                const videoFile = videoInput.files[0];
                handleVideoUpload(videoFile);
                videoInput.value = '';
            } else {
                const messagesRef = ref(db, 'messages');
                push(messagesRef, {
                    name: name,
                    message: message,
                    timestamp: new Date().getTime(),
                });
            }

            messageInput.value = '';
            stopListening();
        }
    };

    sendButton.addEventListener("click", sendMessage);

    messageInput.addEventListener("keypress", event => {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
    // Save image URL to database
    const saveImageToDatabase = (downloadURL) => {
        const name = localStorage.getItem("name");
        const messagesRef = ref(db, "messages");
        push(messagesRef, {
            name: name,
            imageUrl: downloadURL,
            timestamp: new Date().getTime(),
        });
    };
    // 
    // ADD MESSAGE FUNCTION
    var logs = false;
    const addMessage = (name, content, timestamp, imageUrl, videoUrl) => {
        const storedText = localStorage.getItem("name");
        var a = 0;
        const isUserInChat = document.hasFocus();

        if (storedText) {
            const messageContainer = document.getElementById("messages");

            if (storedText === "radha") {
                document.getElementById('pro-name').innerHTML = 'Aho..✨💖'
            }
            else if (storedText === "Daji") {
                document.getElementById('pro-name').innerHTML = 'Bayako..✨💖'
            }
            const messageDiv = document.createElement("div");
            messageDiv.classList.add("message-content");

            if (imageUrl) {
                messageDiv.innerHTML = `
                    
                    <img src="${imageUrl}" alt="Image" class="message-image" onclick="openModal('${imageUrl}')"/><br>
                    <span class="message-time">${formatTimestamp(timestamp)}</span>
                `;

            } else if (videoUrl) {
                messageDiv.innerHTML = `
                    <video style="border: 1px lavender inset" controls muted width="250px" height="150px" class="message-video">
                        <source src="${videoUrl}" type="video/mp4">
                        error
                    </video>
                    <br>
                    <span class="message-time">${formatTimestamp(timestamp)}</span>
                `;
            }
            else {
                messageDiv.innerHTML = `
                    ${content}
                    <span class="message-time">${formatTimestamp(timestamp)}</span>
                `;
            }

            messageDiv.classList.add(name === storedText ? "sent" : "received");
            messageContainer.appendChild(messageDiv);
            messageContainer.scrollTo({
                top: messageContainer.scrollHeight,
                behavior: 'smooth'
            });

            if (!isUserInChat && shouldShowNotification()) {
                showNotification(name, content);
            }
        } else {
            const messageContainer = document.getElementById("messages");
            const errorMessageDiv = document.createElement("div");
            errorMessageDiv.innerHTML = 'Please login again'

            logs = true;
            messageContainer.appendChild(errorMessageDiv);
            messageContainer.scrollTo({
                top: messageContainer.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    const shouldShowNotification = (() => {
        let hasDelayElapsed = false;
    
        setTimeout(() => {
            hasDelayElapsed = true;
        }, 20000);
    
        return () => hasDelayElapsed;
    })();
    
    const showNotification = async (name, content) => {
        if (!("Notification" in window)) {
            console.warn("This browser does not support the Notification API");
            return;
        }
    
        try {
            let permission = Notification.permission;
    
            if (permission === "default") {
                permission = await Notification.requestPermission();
            }
    
            if (permission === "granted") {
                const options = {
                    body: content,
                    badge: "image.png",
                    icon: "image.png",
                    vibrate: [200, 100, 200],
                };
    
                const notification = new Notification(`Message from ${name}`, options);
    
                notification.addEventListener('click', () => {
                    // to be implemented
                });
            } else {
                console.warn("Notification permission not granted.");
            }
        } catch (error) {
            console.error("Error while requesting notification permission:", error);
        }
    };
    
    // Check if the browser supports PushManager (for Web Push API)
    if ("PushManager" in window) {
        // Register service worker
        if ("serviceWorker" in navigator) {
            try {
                const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
                console.log("Service worker registered:", registration);
            } catch (error) {
                console.error("Failed to register service worker:", error);
            }
        } else {
            console.warn("Service workers are not supported in this browser.");
        }
    } else {
        console.warn("Push notifications are not supported in this browser.");
    }
    

    const formatTimestamp = (timestamp) => {
        const currentTime = new Date(timestamp);
        const hours = currentTime.getHours() > 12 ? currentTime.getHours() - 12 : currentTime.getHours();
        const ampm = currentTime.getHours() >= 12 ? 'pm' : 'am';
        const minutes = currentTime.getMinutes();
        return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    };

    const messagesRef = ref(db, "messages");
    onChildAdded(messagesRef, (snapshot) => {
        const messageData = snapshot.val();
        addMessage(messageData.name, messageData.message, messageData.timestamp, messageData.imageUrl, messageData.videoUrl);
    });

});