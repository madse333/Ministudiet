import * as UtilsDatabase from "./Database.js";

let måneder = ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"];

function monthToNumber(month){
    return (måneder.indexOf(month) + 1);
}

export async function getAntal(måned, produkttype) {
  let count = 0;
  let bookinger = await UtilsDatabase.getFraDb();
  let månedNr = monthToNumber(måned);
  bookinger.forEach((doc) => {
    let month = doc.data().datoStart[1];
    if (month == månedNr && produkttype == doc.get("type")) {
      count++;
    }
  });
  return count;
}

export async function getSamletTid(måned, produkttype) {
  let tidCount = 0;
  let bookinger = await UtilsDatabase.getFraDb();
  let månedNr = monthToNumber(måned);

  bookinger.forEach((doc) => {
    let month = doc.data().datoStart[1];
    if (month == månedNr && produkttype == doc.get("type")) {
      let tidsforbrug = doc.get("tidMin");
      tidCount += tidsforbrug;
    }
  });
  return tidCount;
}