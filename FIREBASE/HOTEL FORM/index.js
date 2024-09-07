import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyCzH1dneA5yvBS1yplkV5J5Uk36OScN3PY",
    authDomain: "zahir-khan-cd8d1.firebaseapp.com",
    databaseURL: "https://zahir-khan-cd8d1-default-rtdb.firebaseio.com",
    projectId: "zahir-khan-cd8d1",
    storageBucket: "zahir-khan-cd8d1.appspot.com",
    messagingSenderId: "882366704194",
    appId: "1:882366704194:web:a5a18eb68681059fd49bdb",
    measurementId: "G-6W0SP694ZB"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const analytics = getAnalytics(app);

const donationFormDB = ref(database, 'zahir_khan/donationForm');

document.getElementById("donationForm").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    const hotel = getElementVal("hotel");
    const food = getElementVal("food");
    const phone = getElementVal("phone");
    const address = getElementVal("address");
    const email = getElementVal("email");
    const datetime = getElementVal("datetime");

    saveMessages(hotel, food, phone, address, email, datetime);
    document.querySelector(".alert").style.display = "block";

    setTimeout(() => {
        document.querySelector(".alert").style.display = "none";
    }, 3000);

    document.getElementById("donationForm").reset();
}

const saveMessages = (hotel, food, phone, address, email, datetime) => {
    const newDonationForm = push(donationFormDB);

    set(newDonationForm, {
        hotel: hotel,
        food: food,
        phone: phone,
        address: address,
        email: email,
        datetime: datetime,
    });
};

const getElementVal = (id) => {
    return document.getElementById(id).value;
};
