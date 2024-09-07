import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, onValue, update, remove } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

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
const database = getDatabase(app);

document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.getElementById('complaintList');
    
    const complaintsRef = ref(database, 'complaints');
    onValue(complaintsRef, (snapshot) => {
        tableBody.innerHTML = '';
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                const data = childSnapshot.val();
                const row = document.createElement('tr');
                row.dataset.id = childSnapshot.key;
                row.innerHTML = `
                    <td>${data.name}</td>
                    <td>${data.phone}</td>
                    <td>${data.email}</td>
                    <td>${data.message}</td>
                    <td>
                        <select id="status-${childSnapshot.key}" onchange="updateStatus('${childSnapshot.key}', this)">
                            <option value="Pending" ${data.status === 'Pending' ? 'selected' : ''}>Pending</option>
                            <option value="Under Process" ${data.status === 'Under Process' ? 'selected' : ''}>Under Process</option>
                            <option value="Resolved" ${data.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
                        </select>
                    </td>
                    <td>
                        <textarea placeholder="Reply" id="reply-${childSnapshot.key}">${data.reply || ''}</textarea>
                        <button onclick="replyToComplaint('${childSnapshot.key}', 'reply-${childSnapshot.key}', '${data.email}')">Reply</button>
                    </td>
                    <td><button onclick="deleteItem('${childSnapshot.key}', this)">Delete</button></td>
                `;
                tableBody.appendChild(row);
            });
        }
    }, (error) => {
        console.error('Error fetching data:', error);
    });
});

window.replyToComplaint = function(id, inputId, email) {
    const reply = document.getElementById(inputId).value;
    if (reply) {
        fetch('http://localhost:3000/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                subject: 'Reply to your complaint',
                message: reply
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Email sent successfully.');
                const replyRef = ref(database, `complaints/${id}`);
                update(replyRef, { reply: reply })
                    .then(() => console.log('Reply saved to Firebase'))
                    .catch((error) => console.error('Error updating reply in Firebase:', error));
                document.getElementById(inputId).value = '';
            } else {
                alert('Failed to send email.');
            }
        })
        .catch(error => console.error('Error sending email:', error));
    } else {
        alert('Please enter a reply message.');
    }
}

window.updateStatus = function(id, selectElement) {
    const status = selectElement.value;
    const statusRef = ref(database, `complaints/${id}`);
    update(statusRef, { status: status })
        .then(() => {
            alert('Status updated successfully.');
            fetch('http://localhost:3000/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: selectElement.closest('tr').querySelector('td').innerText,
                    subject: 'Your complaint status has been updated',
                    message: `The status of your complaint has been updated to: ${status}`
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Notification email sent successfully.');
                } else {
                    console.log('Failed to send notification email.');
                }
            })
            .catch(error => console.error('Error sending notification email:', error));
        })
        .catch((error) => console.error('Error updating status in Firebase:', error));
}

window.deleteItem = function(id, buttonElement) {
    const itemRef = ref(database, `complaints/${id}`);
    remove(itemRef)
        .then(() => {
            const row = buttonElement.closest('tr');
            row.remove();
            alert('Complaint deleted successfully.');
        })
        .catch((error) => console.error('Error deleting complaint from Firebase:', error));
}
