import * as Utils from './Database.js';

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
   let tid1 = new Tid("08:00");
   let tid2 = new Tid("09:00");
   let tid3 = new Tid("10:00");
   let tid4 = new Tid("11:00");
   let tid5 = new Tid("12:00");
   let tid6 = new Tid("13:00");
   let tid7 = new Tid("14:00");
   let tid8 = new Tid("15:00");
   let tid9 = new Tid("16:00");
   let tid10 = new Tid("17:00");
   let tid11 = new Tid("18:00");
  
const liste = [tid1, tid2, tid3, tid4, tid5, tid6, tid7, tid8, tid9, tid10, tid11];

   export function getTidsListe(){
    return liste;
   }
  
  // let fremButton = document.querySelector('Button');
  // fremButton.addEventListener("click", skiftUge);
  
  export function createWeek(weekNumber, årstal){
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
  
  export function getDateOfISOWeek(w, y, weekday) {
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
  
  export async function putBookinger(weeknumber, årstal){
    let newWeek = createWeek(weeknumber, årstal);
    let bookinger = await getBookinger();
    bookinger.forEach(booking => {
      for (let j = 0; j < newWeek.length; j++){
          if (newWeek[j].årstal == booking[2]){
              let dato = newWeek[j].dato.split("/");
              if (dato[0] == booking[0] && dato[1] == booking[1]){
                  newWeek[j].tider.find(obj => {
                    if (obj.tid == booking[3]){
                      console.log(obj)
                      obj.tid = "Optaget";
                    } 
                  })
              }
            }
        } 
    });  
    return newWeek;
  }

    export async function getBookinger(){                               
      let bookinger = await Utils.getFraDb();
    
      let bookingListe = 
      bookinger.docs.map(doc =>{
          return doc.get('datoStart');
      });
      
      return bookingListe;
    }