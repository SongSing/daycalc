function el(id) {
    return document.getElementById(id);
}

function init() {
    el("button").onclick = doCalc;
}

window.onload = init;

function doCalc() {
    var input = el("input").value;
    var date;

    if (!(date = tryParse(input))) {
        el("output").innerText = "bad date :/";
        return;
    }

    var day = calcDay(date);
    var name = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][day];
    var a = 0;

    a = new Date(date[2], date[0] - 1, date[1]);
    a -= Date.now();
    a = a / 1000 / 60 / 60 / 24;
    a = Math.ceil(a);

    el("output").innerText = name + "\n" + "(" + a + " day(s) from now)";
}

function tryParse(input) {
    input = input.split("/");

    if (input.length !== 3) {
        return false;
    }

    var month = parseInt(input[0]);
    var day = parseInt(input[1]);
    var year = parseInt(input[2]);

    if (isNaN(month) || isNaN(day) || isNaN(year)
    || month < 1 || month > 12
    || day < 1 || (month > 12 && day > 31)
    || year < 1) {
        return false;
    }

    return [ month, day, year ];
}

function calcDay(month, day, year) {
    if (arguments.length === 1) {
        year = month[2];
        day = month[1];
        month = month[0];
    } else if (arguments.length !== 3) {
        return undefined;
    }

    var century = Math.floor(year / 100);
    var centuryAnchor = 5 * (century % 4) % 7 + 2;

    var yearThing = year % 100;
    if (yearThing % 2 === 1) {
        yearThing += 11;
    }
    yearThing /= 2;
    if (yearThing % 2 === 1) {
        yearThing += 11;
    }
    yearThing = yearThing % 7;
    yearThing = 7 - yearThing;

    var doomsDates = [0,4,9,6,11,8,5,10,7,12];
    var monthThing = (month > 2 ? doomsDates[month - 3] :
        (month === 1 ? (year % 4 === 0 ? 4 : 3) : (year % 4 === 0 ? 29 : 28)));

    var dayThing = day - monthThing;
	console.log(dayThing,yearThing,centuryAnchor);
	
	var sum = dayThing + yearThing + centuryAnchor;
	while (sum < 0) sum += 7; // cant have negative bc used for an index

    return sum % 7;
}