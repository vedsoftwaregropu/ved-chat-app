document.addEventListener("DOMContentLoaded", function () {
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
  //Get Elements
  var txtEmail = document.getElementById("txtEmail");
  var txtPassword = document.getElementById("txtPassword");
  var btnLogin = document.getElementById("btnLogin");
  const database = firebase.database();
  var forgotPasswordLink = document.getElementById("forgotPasswordLink");

  //forgot password
  forgotPasswordLink.addEventListener("click", (e) => {
    const email = txtEmail.value;
    const auth = firebase.auth();
    var toast = document.getElementById("sentToast");

    // Send a password reset email
    if (email) {
      var toast = document.getElementById("sentToast");

      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          toast.innerHTML =
            'Email sent successfully Plz check your Inbox !, <a style="color: crimson" href="/login.html">Back to Login</a> ';
          toast.style.color = "green";
          document.getElementById("txtEmail").innerHTML = "";
        })
        .catch((error) => {
          toast.innerHTML = "Invalid Email Address - Please try again !";
          toast.style.color = "crimson";
        });
    } else {
      toast.innerHTML = "Email cant be empty. Please enter Email !";
      toast.style.color = "crimson";
    }
  });

  // Function to fetch user data from the database
  const fetchUserDataFromDatabase = async (userId) => {
    const userRef = firebase.database().ref("chat-app-users").child(userId);

    return new Promise((resolve, reject) => {
      userRef
        .once("value")
        .then((snapshot) => {
          const userData = snapshot.val();
          resolve(userData);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
});
