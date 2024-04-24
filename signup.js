(function () {
  var firebaseConfig = {
    apiKey: "AIzaSyBrIGd6lyRgRvTNE-Htt3gJO_Uy8PNI6bU",
    authDomain: "ved-chat-app.firebaseapp.com",
    databaseURL: "https://ved-chat-app-default-rtdb.firebaseio.com",
    projectId: "ved-chat-app",
    storageBucket: "ved-chat-app.appspot.com",
    messagingSenderId: "621867816996",
    appId: "1:621867816996:web:b17c33f53820457940a0b1",
    measurementId: "G-E22RS25EQ3",
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
  btnSignup.addEventListener("click", (e) => {
    const email = txtEmail.value;
    const password = txtPassword.value;
    const name = txtName.value;
    const username = txtUsername.value;
    const auth = firebase.auth();

    // Signup with Firebase Auth
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;

        if (user) {
          var userID = user.uid;
          saveUserDataToDatabase(userID, { email, name, username });
          window.alert("SignUp successful. please login..");
          window.location.href = "login.html";
        }
      })
      .catch((err) => {
        alert("Invalid Information");
      });
  });

  // Google Signup Event
  btnGoogleSignup.addEventListener("click", (e) => {
    const provider = new firebase.auth.GoogleAuthProvider();

    // Signup with Google
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var user = result.user;

        if (user) {
          var userID = user.uid;
          saveUserDataToDatabase(userID, {
            email: user.email,
            name: user.displayName,
            username: user.email,
          }); // Adjust as needed
          window.alert("Successful, dear ", user, " please login");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  });

  // Function to save user data to the database
  const saveUserDataToDatabase = (userId, userData) => {
    const usersRef = firebase.database().ref("chat-app-users");
    usersRef.child(userId).set({
      userId: userId,
      ...userData,
    });
  };
})();
