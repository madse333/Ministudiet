import * as UtilsDatabase from './Database.js';

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
    let bookinger = await UtilsDatabase.getFraDb();

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
    let bookinger = await UtilsDatabase.getFraDb();

    bookinger.forEach((doc) => {
        let month = doc.data().datoStart[1]
        if (month == måned && produkttype == doc.get('type')){
            let tidsforbrug = doc.get('tidMin');
            tidCount += tidsforbrug;
    }})
    return tidCount;    
}