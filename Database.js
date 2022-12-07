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

// app.use(sessions({ secret: 'hemmelig', saveUninitialized: true, cookie: { maxAge: 1000*60*20 }, resave: false }));
// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const firebase_db = getFirestore(firebase_app);


// PO ønsker at kunden kan vælge en ledig tid og booke den (ADD SKABELON)
// Datoer består af array
export async function bookTid(kundeNavn, mail, telefonnummer, type, datoStart, datoSlut, lokation, tidMin) {
    if (typeof telefonnummer != "number" && typeof kundeNavn != "string" && typeof type != "string" && typeof lokation != "string" && typeof tidMin != "number"){
            console.log("Forkert input");
    } else {
      let randomBookingNr = Math.floor(Math.random() * 10000000)+1;
    const q = query(collection(firebase_db, "tider"), where("bookingNr", "==", randomBookingNr));
    const querySnapshot = await getDocs(q);
   
    if (querySnapshot.size > 0){
     randomBookingNr = Math.floor(Math.random() * 10000000)+1
   }
   
     const docRef = await addDoc(collection(firebase_db, "tider" ), {
       kundeNavn: kundeNavn,
       mail: mail,
       telefonnummer: telefonnummer,
       type: type,
       datoStart : datoStart,
       datoSlut : datoSlut,
       lokation : lokation,
       bookingNr : randomBookingNr,
       tidMin : tidMin
     });

    }
   }
   
   //bookTid("Preben", "John@gmail.com", "12345678", "Par", [15, 12, 2022, 1200], [15, 12, 2022, 1300], "Viby J", 60);
   
   //#9 PO ønsker at kunden kan aflyse egne bookinger i systemet
   export async function aflysTid(bookingNr, mail) {
    if (typeof bookingNr != "number"){
        console.log("Forkert input");
    } else {
      const q = query(collection(firebase_db, "tider"), where("bookingNr", "==", bookingNr), where("mail", "==", mail));
      const querySnapshot = await getDocs(q);
    
      let booking = querySnapshot.docs[0].id;
      
      await deleteDoc(doc(firebase_db, "tider", booking)); 
    }
   }
   
   //aflysTid(6831746, "John@gmail.com")
   
   // #5 PO ønsker at kunden selv kan ombooke en fotografering
   export async function ombookTid(bookingNr, mail, kundeNavn, telefonnummer, type, datoStart, datoSlut, lokation, tidMin) { 
    bookTid(kundeNavn, mail, telefonnummer, type, datoStart, datoSlut, lokation, tidMin)
     aflysTid(bookingNr, mail);
   }
   
   //ombookTid(6460725, "John@gmail.com", "John", "12345678", "Bryllup", [15,12,2022,1300], [15,12,2022,1200], "Aarhus C" )
   
   export async function getCollection(data){
    let col = collection(firebase_db, data)
    return await getDocs(col);
   }

   //Koden viser priserne i en liste - KUN FOR FAMILIE OG PAR
   export async function chooseProductsFamilieOgPar(){
    let getProducts = await getCollection('FamilieOgPar');
   
    let productList = getProducts.docs.map(doc => {
      let data = doc.data();
      data.docId = doc.id;
      return data.pris;
    })
    return JSON.stringify(productList);
   }
   //console.log(await chooseProductsFamilieOgPar());
   
   //Viser prisen for bryllupper
   export async function chooseProductsBryllupper(){
    let getProducts = await getCollection('Bryllupper');
    
    let productList = getProducts.docs.map(doc => {
      let data = doc.data();
      data.docId = doc.id;
      return data.pris;
    })
    return JSON.stringify(productList);
   }
   //console.log(await chooseProductsBryllupper());


   /*Antaget at oprettelse af en booking tilføjer den nye booking til DB-collection tider (funktionen henter data herfra)*/
  export async function getBookinger(){                                //viser alle bookede tider
    let bookinger = await getCollection('tider');
  
    let bookingListe = bookinger.docs.map(doc =>{
        return doc.get('datoStart');
    });
    
    return bookingListe;
  }


export function getFraDb(){
  return getCollection('tider');
}