import { initializeApp } from 'firebase/app';
import { getStorage, ref } from 'firebase/storage';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAiQAvN3xEgtC229M9snP6LwNxcSS-GyEY",
    authDomain: "famous-archway-274409.firebaseapp.com",
    projectId: "famous-archway-274409",
    storageBucket: "famous-archway-274409.appspot.com",
    messagingSenderId: "486051137610",
    appId: "1:486051137610:web:3c2f8ffe339a8295d5beb3",
    measurementId: "G-M7DDGG9YYG"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
