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

  //Login Event
  btnLogin.addEventListener("click", function (e) {
    const email = txtEmail.value;
    const password = txtPassword.value;
    const auth = firebase.auth();

    //sign in with firebase auth
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        var welcomename = null;
        if (user) {
          document.getElementById("btnLogin").innerHTML = "logging in..";
          var userID = user.uid;
          fetchUserDataFromDatabase(userID)
            .then((userData) => {
              console.log(userData);
              welcomename = userData.name;
              localStorage.setItem("name", userData.name);
              // window.location.href = 'chat.html';
              console.log("Name from DB : ", localStorage.getItem("name"));
              if (welcomename && welcomename != null) {
                window.location.href =
                  "home.html?username=" + encodeURIComponent(welcomename);
              } else {
                window.alert("Error Occured");
                window.location.href = "login.html";
              }
            })
            .catch((error) => {
              console.error("Error fetching user data:", error);
            });
        } else {
          localStorage.setItem("status", "true");
        }
      })
      .catch((err) => {
        alert("Invalid details");
      });
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
