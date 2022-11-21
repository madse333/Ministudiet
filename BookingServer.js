import express from 'express';      
const app = express();

import path from 'path';
import { fileURLToPath } from "url";

const _filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(_filename);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, doc, deleteDoc, addDoc, getDoc, query, where } from 'firebase/firestore'
import { async } from '@firebase/util';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7nHsiYRk1s3UqZsBZu_CwAu1iL936_18",
  authDomain: "ministudietbooking.firebaseapp.com",
  projectId: "ministudietbooking",
  storageBucket: "ministudietbooking.appspot.com",
  messagingSenderId: "759219394404",
  appId: "1:759219394404:web:a167b94942151ad4658c71",
  measurementId: "G-J5P8WL1TKV"
};

// testfeks

// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(firebase_app);

//endpoints

//getRequest
app.get('/', async (request, response) => {
  response.render('kalender');
})

app.get('/information', async(request, response) => {
  response.render('information');
})


//postRequest
// app.post(){
//   response
// }

//putRequest

//deleteRequest
app.delete('/', (request, response) => {
deleteXX(request.params.XX);
response.status(201);
response.send("Deleted");
});



app.listen(8080, () =>console.log('Lytter nu på port 8080'));