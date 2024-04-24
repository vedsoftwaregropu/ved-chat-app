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

    //Login Event
    btnLogin.addEventListener('click', function (e) {
        const email = txtEmail.value;
        const password = txtPassword.value;
        const auth = firebase.auth();

        //sign in with firebase auth
        auth.signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                var user = userCredential.user;
                var welcomename = null;
                if (user) {
                    document.getElementById('btnLogin').innerHTML = 'logging in..'
                    var userID = user.uid;
                    fetchUserDataFromDatabase(userID)
                        .then(userData => {
                            console.log(userData);
                            welcomename = userData.name;
                            localStorage.setItem('name', userData.name);
                            // window.location.href = 'chat.html';
                            console.log("Name from DB : ", localStorage.getItem('name'));
                            if (welcomename && welcomename != null) {
                                window.location.href = 'home.html?username=' + encodeURIComponent(welcomename);
                            }
                            else {
                                window.alert('Error Occured');
                                window.location.href = 'login.html';
                            }
                        })
                        .catch(error => {
                            console.error("Error fetching user data:", error);
                        });
                } else {
                    localStorage.setItem('status', "true");
                }
            })
            .catch(err => {
                alert("Invalid details");
            });
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
