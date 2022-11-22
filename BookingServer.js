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
import { getFirestore, collection, getDocs, doc, deleteDoc, addDoc, getDoc, query, where, setDoc } from 'firebase/firestore'
import { async } from '@firebase/util';
import { stringify } from 'querystring';
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
const firesbase_db = getFirestore(firebase_app);

//endpoints

//getRequest
app.get('/', async (request, response) => {
  response.render('kalender');
})

// Eksempel på at hente fra database med pug
app.get('/index', async (request, response) => {
  const besked = await getBeskeder();
  response.render('index', { beskeder: besked })
})

app.get('/information', async (request, response) => {
  response.render('information');
})

//Forsøg på get
  //const docRef = doc(firesbase_db, "Bryllupper", "denEnkelte");
  //const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   console.log("No such document!");
// }

//Antaget at oprettelse af en booking tilføjer den nye booking til DB-collection Booking2023 (funktionen henter data herfra)
//Forsøg på get af alle dok i collection
// async function getAllDocInCollection(collectionName) {
//   const collectionSnapshot = await getDocs(collection(firesbase_db, collectionName));
//   collectionSnapshot.forEach((doc) => {
//     console.log(doc.id, " => ", doc.data());
//   });
// }

// async function getAllDocInCollection(collectionName) {
//   const collectionSnapshot = await getDocs(collection(firesbase_db, collectionName));
//   var dataString = "";
//   collectionSnapshot.forEach((doc) => {
//     dataString = JSON.stringify(doc.data());
//   })
//   return dataString;
// }

async function getTider(){
  let tidsCol = collection(firesbase_db, 'tider')
  let tider = await getDocs(tidsCol);

  let tidsListe = tider.docs.map(doc =>{
      let data = doc.data();
      data.docId = doc.id;
      return data;
  })
  return JSON.stringify(tidsListe);
}

//HUSK ' ' 
// console.log(getAllDocInCollection('Booking2023'));
console.log(await getTider());



//postRequest
// app.post(){
//   response
// }

//create collection
/*
En collection kan ikke oprettes uden min. ét dokument,
hvis ikke den gives et dokumentID og dokumentData, så opretter den bare en test

*/
/*
async function addCollection(collectionNavn, dokumentID, dokumentData){
    firebase_app.database().ref
}
*/




//set dokument - TEST MIG
/*
Skal kende collection navn
Find selv på navn til dokumentID
Data er værdien du vil have ind
*/

async function addDokument(collectionNavn, dokumentID, data){
 await setDoc(doc(firesbase_db,collectionNavn,dokumentID), data);
} 

let buuuuh = {navn : "John"};

//SKAL HAVEET OBJEKT
addDokument('TestKollektion', 'Test2', buuuuh);


//Update dokument - ikke færdig
async function updateDokument(collectionNavn, dokumentID){
  let updateDocInfo = doc(firesbase_db,'"' + collectionNavn + '"', '"' + '"' + dokumentID + '"');

  updateDoc(updateDocInfo, {
    
  })
}



//putRequest5

//deleteRequest
app.delete('/', (request, response) => {
  deleteXX(request.params.XX);
  response.status(201);
  response.send("Deleted");
});

app.listen(8080, () => console.log('Lytter nu på port 8080'));