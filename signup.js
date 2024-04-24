(function () {
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

    // Get Elements
    var txtEmail = document.getElementById("txtEmailId");
    var txtPassword = document.getElementById("txtPasswordUp");
    var txtName = document.getElementById("txtName"); 
    var txtUsername = document.getElementById("txtUsername");
    var btnSignup = document.getElementById("btnSignup");
    var btnGoogleSignup = document.getElementById("btnGoogleSignup");
    const database = firebase.database();


    // Signup Event
    btnSignup.addEventListener('click', e => {
        const email = txtEmail.value;
        const password = txtPassword.value;
        const name = txtName.value; 
        const username = txtUsername.value; 
        const auth = firebase.auth();

        // Signup with Firebase Auth
        auth.createUserWithEmailAndPassword(email, password)
            .then(userCredential => {
                var user = userCredential.user;

                if (user) {
                    var userID = user.uid;
                    saveUserDataToDatabase(userID, { email, name, username });
                    window.alert("SignUp successful. please login..");
                    window.location.href = 'login.html';
                }
            })
            .catch(err => {
                alert("Invalid Information");
            });
    });

    // Google Signup Event
    btnGoogleSignup.addEventListener('click', e => {
        const provider = new firebase.auth.GoogleAuthProvider();

        // Signup with Google
        firebase.auth().signInWithPopup(provider)
            .then(result => {
                var user = result.user;

                if (user) {
                    var userID = user.uid;
                    saveUserDataToDatabase(userID, { email: user.email, name: user.displayName, username: user.email }); // Adjust as needed
                    window.alert("Successful, dear ", user," please login");
                }
            })
            .catch(err => {
                alert(err.message);
            });
    });

    // Function to save user data to the database
    const saveUserDataToDatabase = (userId, userData) => {
        const usersRef = firebase.database().ref('chat-app-users');
        usersRef.child(userId).set({
            userId: userId,
            ...userData,
        });
    };
}());
