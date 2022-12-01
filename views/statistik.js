//Statistik: varighed pr. produkttype 
// function getVarighed() {
//   for (p in Produkttyper){
//     let varighed = p.datoSlut - p.datoSlut;
//   }
// 	return varighed;
// }


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


export function getAntal(måned, produkttype) {		
    if (måned == {måned} && product == {produkttype}){   	        //kobles rigtigt op på db							
	for (let i = 0; i < bookingerForMd.length; i++) {
        count++; 
        antal = count;
        return antal;
		}
	}
}
// For at kalde getAntal fra statistik.js: console.log(getAntal);
// For at kalde getAntal fra BookingServer.js: console.log(Utils2.getAntal);

export function getSamletTid(måned, produkttype) {		
    let countMin = 0;
    if (måned == {måned} && product == {produkttype}){   	        //kobles rigtigt op på db							
        for (let i = 0; i < bookingerForMd.length; i++) {
            countMin += bookingerForMd[i].tidMin;                   //db-navne tjek for opdateret version
            return countMin;
            }
        }
}