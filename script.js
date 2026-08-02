// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyAe7XexnqsSqXhto5ya7400OawDFVesnKc",
    authDomain: "chitti-events.firebaseapp.com",
    projectId: "chitti-events",
    storageBucket: "chitti-events.firebasestorage.app",
    messagingSenderId: "154756967323",
    appId: "1:154756967323:web:e8e51e61a7da8eba5b4f3e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.db = db;
window.collection = collection;
window.addDoc = addDoc;
window.getDocs = getDocs;
window.query = query;
window.orderBy = orderBy;

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

console.log("Firebase Connected Successfully!");

document.getElementById("bookingForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const date = document.getElementById("date").value;
    const event = document.getElementById("event").value;
    const requirements = document.getElementById("requirements").value;

    const message =
`*New Booking Request*

👤 Name: ${name}
📞 Mobile: ${phone}
📅 Date: ${date}
🎉 Event: ${event}
📝 Requirements: ${requirements}`;

    const url = `https://wa.me/919618268709?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
});


// Load Reviews
async function loadReviews() {

    const reviewsList = document.getElementById("reviews-list");

    reviewsList.innerHTML = "";

    const q = query(collection(db, "reviews"));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {

        const data = doc.data();

        reviewsList.innerHTML += `
            <div class="review-card">
                <h3>${data.name}</h3>
                <p style="color:#ff9800;font-size:20px;">
                    ${"⭐".repeat(Number(data.rating))}
                </p>
                <p>${data.review}</p>
            </div>
        `;

    });

}

// Automatically load reviews
loadReviews();