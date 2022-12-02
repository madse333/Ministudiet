import express, { json } from 'express';
const app = express();
import sessions from 'express-session';

import path from 'path';
import { fileURLToPath } from "url";
import bodyParser from 'body-parser';

const _filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(_filename);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

app.use(sessions({ secret: 'hemmelig', saveUninitialized: true, cookie: { maxAge: 1000*60*20 }, resave: false }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({extended: true}));

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, updateDoc, doc, deleteDoc, addDoc, getDoc, query, where, setDoc } from 'firebase/firestore'
import { async } from '@firebase/util';
import { stringify } from 'querystring';
import { exit } from 'process';
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

import * as Utils from './Database.js';
import * as Utils2 from './views/statistik.js';
  // For at kalde getAntal fra statistik.js: console.log(getAntal);
  // For at kalde getAntal fra BookingServer.js: console.log(Utils2.getAntal);

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
      this.dato;
      this.årstal;
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
 let tid1 = new Tid("0800");
 let tid2 = new Tid("0900");
 let tid3 = new Tid("1000");
 let tid4 = new Tid("1100");
 let tid5 = new Tid("1200");
 let tid6 = new Tid("1300");
 let tid7 = new Tid("1400");
 let tid8 = new Tid("1600");
 let tid9 = new Tid("1800");

const liste = [tid1, tid2, tid3, tid4, tid5, tid6, tid7, tid8, tid9];

// let fremButton = document.querySelector('Button');
// fremButton.addEventListener("click", skiftUge);

function createWeek(weekNumber, årstal){
  let newWeek = JSON.parse(JSON.stringify(dage));
  console.log(dage);
  let week = weekNumber;
  for (let i = 0; i < newWeek.length; i++) {
    newWeek[i].dato = getDateOfISOWeek(week, new Date().getFullYear(),i);
    newWeek[i].årstal = årstal;
    for (let j = 0; j < liste.length; j++) {
      newWeek[i].tider.push(JSON.parse(JSON.stringify(liste[j])));
    }
  }
  console.log(newWeek);
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

async function putBookinger(weeknumber, årstal){
  let newWeek = createWeek(weeknumber, årstal);
  let bookinger = await Utils.getTider();
  for (let i = 0; i < bookinger.length; i++){
    for (let j = 0; j < newWeek.length; j++){
        if (newWeek[j].årstal == bookinger[i].datoStart[2]){
            let dato = newWeek[j].dato.split("/");
            if (dato[0] == bookinger[i].datoStart[0] && dato[1] == bookinger[i].datoStart[1]){
                newWeek[j].tider.find(obj => {
                  if (obj.tid == bookinger[i].datoStart[3]){
                    console.log(obj)
                    obj.tid = "Optaget";
                  } 
                })
            }
        }
    }
  }
  return newWeek;
}


//getRequest
app.get('/', async (request, response) => {
  let årstal = new Date().getFullYear();
  let weekNumber = Math.ceil(Math.floor((new Date() - new Date(årstal, 0, 1)) /(24 * 60 * 60 * 1000))/7);
  let week = request.session.week;
  if (week == null) {
      week = 0;
  }
  weekNumber += Number(week);
  if (weekNumber > 52){
    årstal++;
  }
  
  let dage = await putBookinger(weekNumber, årstal)
  response.render('kalender', {list : liste, dage : dage, weekNumber : weekNumber, årstal : årstal});
})


app.get('/information', async (request, response) => {
  let bookingdato = request.session.booking;
  
  response.render('information', {bookingDato : bookingdato});
})

// Eksempel på at hente fra database med pug
app.get('/statistik', async (request, response) => {
  response.render('statistik')
})

app.post('/shiftWeeks', (request, response) => {
  const { value } = request.body;
  let week = request.session.week;
  if (week == null) {
      week = 0;
  }
  week += Number(value);
  request.session.week = week
  response.status(201).send(['Uge skiftet']);
})

app.post('/bookTid', (request, response) => {
  const dag = request.body.dag;
  const type = request.body.type;
  let bookingType = request.session.type;
  bookingType = type;
  let booking = request.session.booking;
  booking = dag;

  request.session.type = bookingType;
  request.session.booking = booking;
  response.status(201).send(['booking markeret']);
})

app.post('/bookInformation', (request, response) => {
  let navn = request.body.navn;
  let efternavn = request.body.efternavn;
  let mail = request.body.mail;
  let tlfnr = request.body.tlfnr;
  let dato = request.session.booking.split("/");
  let type = request.session.type;
  let ønsker = request.body.ønsker;

  Utils.bookTid(navn + " " + efternavn, mail, tlfnr, type, [dato[0], dato[1], dato[2], dato[3]], null, ønsker, 100);
  response.status(201).send(['Information indtastet']);
})



//deleteRequest
app.delete('/', (request, response) => {
  deleteXX(request.params.XX);
  response.status(201);
  response.send("Deleted");
});

console.log(Utils2.getTider())
//Utils.bookTid("Kresten", "John@gmail.com", 12345678, "Par", [15, 12, 2022, 1200], [15, 12, 2022, 1300], "Viby J", 60);


app.listen(8080, () => console.log('Lytter nu på port 8080'));