import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAqQwegSn7TTdX4n9zRj9sd9Dogx3iFx_Y",
    authDomain: "complain-8bbe9.firebaseapp.com",
    databaseURL: "https://complain-8bbe9-default-rtdb.firebaseio.com",
    projectId: "complain-8bbe9",
    storageBucket: "complain-8bbe9.appspot.com",
    messagingSenderId: "4559223209",
    appId: "1:4559223209:web:20a430d5f7df83c3c2acb8",
    measurementId: "G-W87P10C1E8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    authenticate();
});

function authenticate() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            localStorage.setItem('authenticated', 'true');
            alert("Login successful");
            window.location.assign("pr.html");
        })
        .catch(() => {
            alert("Invalid email or password");
        });
}
