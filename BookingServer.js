import express from 'express';
const app = express();
import sessions from 'express-session';

import path from 'path';
import { fileURLToPath } from "url";

const _filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(_filename);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

app.use(sessions({ secret: 'hemmelig', saveUninitialized: true, cookie: { maxAge: 1000*60*20 }, resave: false }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, updateDoc, doc, deleteDoc, addDoc, getDoc, query, where, setDoc } from 'firebase/firestore'
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

// app.use(sessions({ secret: 'hemmelig', saveUninitialized: true, cookie: { maxAge: 1000*60*20 }, resave: false }));
// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const firesbase_db = getFirestore(firebase_app);

//endpoints

//getRequest
class Dag {
  constructor(navn) {
      this.navn = navn;
      this.tider = [];
  }
 }

 let mandag = new Dag("Mandag ")
 let tirsdag = new Dag("Tirsdag ")
 let onsdag = new Dag("Onsdag ")
 let torsdag = new Dag("Torsdag ")
 let fredag = new Dag("Fredag ")
 let lørdag = new Dag("Lørdag ")
 let søndag = new Dag("Søndag ")
  const dage = [mandag, tirsdag, onsdag, torsdag, fredag, lørdag, søndag];

//endpoints
class Tid {
  constructor(tid) {
      this.tid = tid;
  }
 }
 let tid1 = new Tid("8:00");
 let tid2 = new Tid("9:00");
 let tid3 = new Tid("10:00");
 let tid4 = new Tid("11:00");
 let tid5 = new Tid("12:00");
 let tid6 = new Tid("13:00");
 let tid7 = new Tid("14:00");
 let tid8 = new Tid("16:00");
 let tid9 = new Tid("18:00");

const liste = [tid1, tid2, tid3, tid4, tid5, tid6, tid7, tid8, tid9];

let weekNumber = Math.ceil(Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 1)) /(24 * 60 * 60 * 1000))/7);

// let fremButton = document.querySelector('Button');
// fremButton.addEventListener("click", skiftUge);

function createWeek(){
  let newWeek = JSON.parse(JSON.stringify(dage));
  console.log(dage);
  let week = weekNumber;
  for (let i = 0; i < newWeek.length; i++) {
    newWeek[i].navn += getDateOfISOWeek(week, new Date().getFullYear(),i);
    for (let j = 0; j < liste.length; j++) {
      newWeek[i].tider.push(liste[j]);
    }
  }
  return newWeek;
}

function getDateOfISOWeek(w, y, weekday) {
  var simple = new Date(y, 0, 1 + (w - 1) * 7);
  var dow = simple.getDay();
  var ISOweekStart = simple;
  if (dow <= 4)
      ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
  else
      ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
      ISOweekStart.setDate(ISOweekStart.getDate() + weekday);
      return (ISOweekStart.getDate()) + "/" + (ISOweekStart.getMonth() + 1);
}


//getRequest
app.get('/', async (request, response) => {
  weekNumber = Math.ceil(Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 1)) /(24 * 60 * 60 * 1000))/7);
  response.render('kalender', {list : liste, dage : createWeek(0), weekNumber : weekNumber});
})

// Eksempel på at hente fra database med pug
app.get('/index', async (request, response) => {
  const besked = await getBeskeder();
  response.render('index', { beskeder: besked })
})

app.get('/information', async (request, response) => {
  response.render('information', {list : liste});
})

// Eksempel på at hente fra database med pug
app.get('/statistik', async (request, response) => {
  response.render('statistik')
})

app.post('/shiftWeeks', (request, response) => {
  const { value } = request.body;
  console.log(value)
  let week = request.session.kurv;
  if (week == null) {
      week = [];
  }
  weekNumber += Number(value);
  request.session.week = week
  response.status(201).send(['købt']);
})


/*Antaget at oprettelse af en booking tilføjer den nye booking til DB-collection tider (funktionen henter data herfra)*/
async function getTider(){                                //viser alle bookede tider
  let tidsCol = collection(firesbase_db, 'tider')
  let tider = await getDocs(tidsCol);

  let tidsListe = tider.docs.map(doc =>{
      let data = doc.data();
      data.docId = doc.id;
      return data.tidspunktStart;
  })
  tidsListe = tidsListe.map(({datoStart, datoSlut}) => ({datoStart, datoSlut}));

  return JSON.stringify(tidsListe);
}

//HUSK ' ' 
// console.log(getAllDocInCollection('Booking2023'));
//console.log(await getTider());



//SKABELON
async function addDokument(collectionNavn, dokumentID, data){
 await setDoc(doc(firesbase_db,collectionNavn,dokumentID), data);
} 

let buuuuh = {navn : "John"};

// PO ønsker at kunden kan vælge en ledig tid og booke den (ADD SKABELON)
// Datoer består af array
// async function bookTid(kundeNavn, mail, telefonnummer, type, datoStart, datoSlut, lokation) {

//   const docRef = await addDoc(collection(firesbase_db, "tider" ), {
//     kundeNavn: kundeNavn,
//     mail: mail,
//     telefonnummer: telefonnummer,
//     type: type,
//     datoStart : datoStart,
//     datoSlut : datoSlut,
//     lokation : lokation
//   });
// }

// bookTid("John", "John@gmail.com", "12345678", "Par", [15, 12, 2022, 1200], [15, 12, 2022, 1300])

//Koden viser priserne i en liste - KUN FOR FAMILIE OG PAR
async function chooseProductsFamilieOgPar(){
  let productCol = collection(firesbase_db, 'FamilieOgPar')
  let getProducts = await getDocs(productCol);

  let productList = getProducts.docs.map(doc => {
    let data = doc.data();
    data.docId = doc.id;
    return data.pris;
  })
  return JSON.stringify(productList);
}
//console.log(await chooseProductsFamilieOgPar());
//Viser prisen for bryllupper
async function chooseProductsBryllupper(){
  let productCol = collection(firesbase_db, 'Bryllupper')
  let getProducts = await getDocs(productCol);

  let productList = getProducts.docs.map(doc => {
    let data = doc.data();
    data.docId = doc.id;
    return data.pris;
  })
  return JSON.stringify(productList);
}
console.log(await chooseProductsBryllupper());


//putRequest5

//deleteRequest
app.delete('/', (request, response) => {
  deleteXX(request.params.XX);
  response.status(201);
  response.send("Deleted");
});

app.listen(8888, () => console.log('Lytter nu på port 8080'));