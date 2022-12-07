// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, updateDoc, doc, deleteDoc, addDoc, getDoc, query, where, setDoc } from 'firebase/firestore'
import { async } from '@firebase/util';
import { stringify } from 'querystring';
import { exit } from 'process';
import { getFraDb } from "../Database";
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


export function monthToNumber(month){
    let monthNr = 12
    if(month = "januar"){
        monthNr = 1;
    }
    else if(month = "februar"){
        monthNr = 2;
    }
    else if(month = "marts"){
        monthNr = 3;
    }
    else if(month = "april"){
        monthNr = 4;
    }
    else if(month = "maj"){
        monthNr = 5;
    }
    else if(month = "juni"){
        monthNr = 6;
    }
    else if(month = "juli"){
        monthNr = 7;
    }
    else if(month = "august"){
        monthNr = 8;
    }
    else if(month = "september"){
        monthNr = 9;
    }
    else if(month = "oktober"){
        monthNr = 10;
    }
    else if(month = "november"){
        monthNr = 11;
    }
     return monthNr;   
}

export async function getAntal(måned, produkttype) {	
    let count = 0;	
    let bookinger = getFraDb(); 

    bookinger.forEach((doc) => {
          let month = doc.data().datoStart[1]
          if (month == måned && produkttype == doc.get('type')){
        count++;
      }      
    })
    return count;
}


export async function getSamletTid(måned, produkttype) {		
    let tidCount = 0;	
    let bookinger = getFraDb();

    bookinger.forEach((doc) => {
        let month = doc.data().datoStart[1]
        if (month == måned && produkttype == doc.get('type')){
            let tidsforbrug = doc.get('tidMin');
            tidCount += tidsforbrug;
    }})
    return tidCount;    
}

console.log("Samlet tid " + await getSamletTid(12, "Par"));
console.log("Antal tider: " + await getAntal(12, "Par"));
    