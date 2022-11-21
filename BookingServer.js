const express = require('express');
const app = express();


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, deleteDoc, addDoc, getDoc, query, where } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaGDp_bVIdiYsObgZ0sGX2SkJqNDeTXGw",
  authDomain: "testservermortens.firebaseapp.com",
  databaseURL: "https://testservermortens-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "testservermortens",
  storageBucket: "testservermortens.appspot.com",
  messagingSenderId: "381122777489",
  appId: "1:381122777489:web:4e799dc3a63fb85f46ca30"
};

// testfeks

// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);
const db = getFirestore(firebase_app);
//getRequest



//postRequest

//putRequest

//deleteRequest

//endpoints

app.get('/kalender', async (request, response) => {
  response.render('index');
})