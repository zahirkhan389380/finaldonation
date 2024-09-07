// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDglWshSR5Ow6tfVNnyaYBcgepKi7ArZc8",
    authDomain: "hotel-d4910.firebaseapp.com",
    databaseURL: "https://hotel-d4910-default-rtdb.firebaseio.com",
    projectId: "hotel-d4910",
    storageBucket: "hotel-d4910.appspot.com",
    messagingSenderId: "417555488525",
    appId: "1:417555488525:web:fac401113b431d47391a44",
    measurementId: "G-G6D3W5WRTN"
};

// Initialize Firebase
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
        .then((userCredential) => {
            localStorage.setItem('authenticated', 'true');
            alert("Login successful");
            window.location.assign("index2.html");
        })
        .catch((error) => {
            alert("Invalid email or password");
        });
}
