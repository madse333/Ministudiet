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
console.log("Samlet tid " + await getSamletTid(12, "Par"));
console.log("Antal tider: " + await getAntal(12, "Par"));
    