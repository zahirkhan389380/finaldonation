  

    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
    import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

    
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
    const database = getDatabase(app);

    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('Name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        // Reference to the database
        const complaintsRef = ref(database, 'complaints');

        // Save data to Firebase
        push(complaintsRef, {
            name: name,
            email: email,
            phone: phone,
            message: message
        }).then(() => {
            alert('Complaint submitted successfully!');
            document.getElementById('contactForm').reset();
        }).catch((error) => {
            console.error('Error submitting complaint:', error);
            alert('Error submitting complaint.');
        });
    });