const moment = require('moment');

let dateArr = []; //Array where rest of the dates will be stored

//extracting date from objects in MM-DD-YYYY format
let debut = moment("2020-06-01");
let fin = moment("2020-06-15");

//creating JS date objects
let start = new Date(debut);
let end = new Date(fin);

//Logic for getting rest of the dates between two dates("FromDate" to "EndDate")
while (start < end) {
    dateArr.push(moment(start).format("YYYY-MM-DD"));
    let newDate = start.setDate(start.getDate() + 1);
    start = new Date(newDate);
}

const result = dateArr.filter(date => date !== dateArr[0])
console.log(result);
