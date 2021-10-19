// assign the entire table rows to a variable, rows
let rows = document.getElementsByTagName("tr");

//declare an array for each row, elem
let elem = [];

//set a loops to assign each row (from hole 1 to hole 18) to each element in array. 
//also, for each elem, assign functions for each buttons - add, substracts, and clear.
for (let i = 1; i < rows.length - 1; i++) {
    elem[i] = document.getElementById(i);
    elem[i].children[4].children[0].onclick = function() {
        add1(elem[i]);
    };
    elem[i].children[4].children[1].onclick = function() {
        sub1(elem[i]);
    };
    elem[i].children[4].children[2].onclick = function() {
        clear(elem[i]);
    }
}

// create an "add1" function
function add1(elem) {
    if (elem.children[2].innerHTML == "-") {
        elem.children[2].innerHTML = "1";
        diff(elem);
    } else {
        let currentScore = elem.children[2].innerHTML;
        currentScore = Number.parseInt(currentScore);
        elem.children[2].innerHTML = currentScore + 1;
        diff(elem);
    }
    addTotal();
}

// create an "sub1" function
function sub1(elem) {
    if (elem.children[2].innerHTML == "-") {
        elem.children[2].innerHTML == "-";
    } else {
        let currentScore = elem.children[2].innerHTML;
        currentScore = Number.parseInt(currentScore);
        elem.children[2].innerHTML = currentScore - 1;
        diff(elem);
    }
    addTotal();
}

// create an "diff1" function
function diff(elem) {
    let currentScore = elem.children[2].innerHTML;
    currentScore = Number.parseInt(currentScore);
    let par = elem.children[1].innerHTML;
    par = Number.parseInt(par);
    elem.children[3].innerHTML = currentScore - par;
}

// create an "addTotal" function
function addTotal() {
    let parTotal = 0;
    let totalScore = 0;
    let overTotal = 0;

    for (let i = 1; i < rows.length - 1; i++) {
        let par = elem[i].children[1].innerHTML;
        let score = elem[i].children[2].innerHTML;
        let over = elem[i].children[3].innerHTML;

        if (isNaN(score)) {
            parTotal += 0;
            totalScore += 0;
            overTotal += 0;
        } else {
            parTotal += parseInt(par);
            totalScore += parseInt(score);
            overTotal += parseInt(over);
        }
    }

    if (totalScore == 0 && parTotal == 0 && overTotal == 0) {
        rows[19].children[1].innerText = "-";
        rows[19].children[2].innerText = "-";
        rows[19].children[3].innerText = "-";
    } else {
        rows[19].children[1].innerText = parTotal;
        rows[19].children[2].innerText = totalScore;
        rows[19].children[3].innerText = overTotal;
    }
}

function clear(elem) {
    elem.children[2].innerHTML = "-";
    elem.children[3].innerHTML = "-";
    addTotal(elem);
}
