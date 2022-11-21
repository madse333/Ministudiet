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
import { get } from 'http';
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

//Forsøg på get
const docRef = doc(db, "Bryllupper", "denEnkelte");
const docSnap = await getDoc(docRef);

if(docSnap.exists()){
  console.log("Document data:", docSnap.data());
} else {
  console.log("No such document!");
}
async function getCalendar() {
  let calCol=collection(db, 'Bryllupper');
  let dates = await getDocs(calCol);

  let calList = dates.docs.map(doc => {
      let data = doc.data();
      data.docID = doc.id;
      return data;
  })
  return calList;
}

//postRequest
// app.post(){
//   response
// }

//set collection
async function addCollection{

}
//set dokument - TEST MIG
/*
Skal kende collection navn
Find selv på navn til dokumentID
Data er værdien du vil have ind
*/
async function addDokument(collectionNavn, dokumentID, data){
  setDoc(doc(db, '"' + collectionNavn + '"','"' + dokumentID + '"'), data);
} 

/*
Update dokument
*/
async function updateDokument(collectionNavn, dokumentID){
  let updateDocInfo = doc(db,'"' + collectionNavn + '"', '"' + '"' + dokumentID + '"');

  updateDoc(updateDocInfo, {
    
  })
}


//putRequest

//deleteRequest
app.delete('/', (request, response) => {
deleteXX(request.params.XX);
response.status(201);
response.send("Deleted");
});


console.log(getCalendar());
 app.listen(8080, () =>console.log('Lytter nu på port 8080'));