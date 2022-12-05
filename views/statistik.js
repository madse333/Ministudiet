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


let bookingerForMd = new Array(50); 	
let count = 0;

 function getbookingerForMd() {
	return bookingerForMd;
}
function setbookingerForMd(bookingerForMd) {
	this.bookingerForMd = bookingerForMd;
}

function getCount() {
	return count;
}

// function resetCount() {
// 	count = 1;
// }

      
//import { collection, query, getDocs, doc } from "firebase/firestore";
//import { firebase_db } from "../Database";

export async function getAntal(måned, produkttype) {	
    let count = 0;	
    const q = query(collection(firebase_db, "tider"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        //if (måned == doc.datoStart[1] && produkttype == doc.type){
            if (produkttype == doc.type){
         count++;
        }      
    })
    return count;
}

// For at kalde getAntal fra statistik.js: console.log(getAntal);
// For at kalde getAntal fra BookingServer.js: console.log(Utils2.getAntal);

export async function getSamletTid(måned, produkttype) {		
    let tidCount = 0;	
    const q = query(collection(firebase_db, "tider"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        //if (måned == doc.datoStart[1] && produkttype == doc.type){
            //if (måned == doc.datoStart[1]){
                if (produkttype == doc.type){
            console.log("før if")
            if (produkttype == doc.type){
         let tidsforbrug = doc.tidMin;   
         tidCount += tidsforbrug;
         console.log("test");
         console.log(tidCount);
        }      
    }})
    console.log("test");
    console.log(tidCount);
    return tidCount; 
    //return stringify(tidCount);    
}
console.log(getSamletTid(12, "Par"));
console.log(getAntal(12, "Par"));
    