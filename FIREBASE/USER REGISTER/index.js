// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Your web app's Firebase configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Show Registration Form and Hide Login Form
function showRegistrationForm() {
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
}

// Show Login Form and Hide Registration Form
function showLoginForm() {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

// Event listener for Registration Form
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    register();
});

// Event listener for Login Form
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    login();
});

function register() {
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Registered successfully
            alert("Registration successful");
            showLoginForm();
        })
        .catch((error) => {
            alert("Error registering: " + error.message);
        });
}

function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Logged in successfully
            localStorage.setItem('authenticated', 'true');
            alert("Login successful");
            window.location.assign("pr.html");
        })
        .catch((error) => {
            alert("Invalid email or password");
        });
}

// Initial display
showRegistrationForm();
