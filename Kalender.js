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
   let tid1 = new Tid("0800");
   let tid2 = new Tid("0900");
   let tid3 = new Tid("1000");
   let tid4 = new Tid("1100");
   let tid5 = new Tid("1200");
   let tid6 = new Tid("1300");
   let tid7 = new Tid("1400");
   let tid8 = new Tid("1500");
   let tid9 = new Tid("1600");
   let tid10 = new Tid("1700");
   let tid11 = new Tid("1800");
  
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