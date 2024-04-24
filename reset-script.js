document.addEventListener("DOMContentLoaded", function () {
    var firebaseConfig = {
        apiKey: "AIzaSyDN2WarbO5QRcTFnWeq1oKWdokZkipp0Q8",
        authDomain: "simplechatapp-17af2.firebaseapp.com",
        databaseURL: "https://simplechatapp-17af2-default-rtdb.firebaseio.com",
        projectId: "simplechatapp-17af2",
        storageBucket: "simplechatapp-17af2.appspot.com",
        messagingSenderId: "716535579361",
        appId: "1:716535579361:web:1144052a85bd7a358a2da0"
    };

    firebase.initializeApp(firebaseConfig);
    //Get Elements
    var txtEmail = document.getElementById("txtEmail");
    var txtPassword = document.getElementById("txtPassword");
    var btnLogin = document.getElementById("btnLogin");
    const database = firebase.database();
    var forgotPasswordLink = document.getElementById("forgotPasswordLink");


    //forgot password
    forgotPasswordLink.addEventListener('click', e => {
        const email = txtEmail.value;
        const auth = firebase.auth();
        var toast = document.getElementById('sentToast');

        // Send a password reset email
        if (email) {
            var toast = document.getElementById('sentToast');

            auth.sendPasswordResetEmail(email)
                .then(() => {
                    toast.innerHTML = 'Email sent successfully Plz check your Inbox !, <a style="color: crimson" href="/login.html">Back to Login</a> ';
                    toast.style.color = 'green';
                    document.getElementById('txtEmail').innerHTML = ''
                })
                .catch(error => {
                    toast.innerHTML = 'Invalid Email Address - Please try again !';
                    toast.style.color = 'crimson';
                });
        }
        else {
            toast.innerHTML = 'Email cant be empty. Please enter Email !';
            toast.style.color = 'crimson';
        }
    });


    // Function to fetch user data from the database
    const fetchUserDataFromDatabase = async (userId) => {
        const userRef = firebase.database().ref('chat-app-users').child(userId);

        return new Promise((resolve, reject) => {
            userRef.once('value')
                .then(snapshot => {
                    const userData = snapshot.val();
                    resolve(userData);
                })
                .catch(error => {
                    reject(error);
                });
        });
    };
});
