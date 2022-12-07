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


import * as Utils from './Database.js';
import * as Utils2 from './statistik.js';
import * as Utils3 from './Kalender.js';


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
  let dage = await Utils3.putBookinger(weekNumber, årstal)
  let liste = Utils3.getTidsListe();
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

app.get('/afslut', async (request, response) => {
  response.render('afslut');
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
  console.log(type);
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

//console.log(Utils.getTider())
//Utils.bookTid("Kresten", "John@gmail.com", 12345678, "Par", [15, 12, 2022, 1200], [15, 12, 2022, 1300], "Viby J", 60);


app.listen(8080, () => console.log('Lytter nu på port 8080'));