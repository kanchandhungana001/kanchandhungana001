// 6. modify basic JS object, with "this" keyword
let person = {
  firstName: "Jane",
  lastName: "Doe",
  age: 45,
  streetAddress: "123 Main Street",
  city: "University Center",
  state: "Michigan",
  zipCode: 48360,
  fullAddress: function() {
          return this.streetAddress + ", " + this.city + ", " + this.state + ", " + this.zipCode;
      },
  fullName: function() {
          return this.firstName + " " + this.lastName;
      }
};
document.getElementById("1A").innerHTML = person.fullName();
document.getElementById("1B").innerHTML = person.fullAddress();

// Instructions
// modify person object, above, as follows
// add properties, streetAddress, city, state, zipCode
// add method, fullAddress(), which prints full address on a single line.
// Display output of fullAddress() in <div id="1B">


// ==================

// 7. create basic DOM object
let div2a = document.getElementById("2A");
let table2a = createTable("table2a");
div2a.appendChild(table2a);
table2a.setAttribute("style", "border:1px solid black;");
table2a.setAttribute("width", "100%");
appendTableRow3(table2a, "1", "2", "3");
appendTableRow3(table2a, "4", "5", "6");
appendTableRow3(table2a, "7", "8", "9");

// Instructions
// add a new function, appendTableRow5(), which adds 5-column rows instead of 3-column rows
// create a 5-row by 5-column table showing the numbers, 1 through 25
// put borders around the cells, too, not just around the edge of the table
// Display output in <div id="2B">
let div2b = document.getElementById("2B");
let table2b = createTable("table2b");
div2b.appendChild(table2b);
table2b.setAttribute("style", "border:1px solid black;");
table2b.setAttribute("width", "100%");
let num = 1;
for (let i = 1; i <= 5; i++) {
  appendTableRow5(table2b, num.toString(), (num + 1).toString(), (num + 2).toString(), (num + 3).toString(), (num + 4).toString());
  num += 5;
}

function appendTableRow5(tableobj, col1, col2, col3, col4, col5) {
      // create column (table division) DOM objects
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      let td3 = document.createElement("td");
      let td4 = document.createElement("td");
      let td5 = document.createElement("td");
      // insert content into columns
      td1.innerHTML = col1;
      td2.innerHTML = col2;
      td3.innerHTML = col3;
      td4.innerHTML = col4;
      td5.innerHTML = col5;
      // create table row DOM object
      let tr = document.createElement("tr");
      // append table divisions (columns) to table row
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);
      // append the row to the tbody element in the table
      tableobj.children[0].appendChild(tr);
  }
  // ==================

// 8. create "totals" row and column in a table

// Instructions
// don't change table3A. it's just a template.
// Use table03A to create table3B. Create new functions as in item 2, above. 
// in table3B, add a column, "Price * Qty", and use JS to compute the correct values to put in the column
// add to table03B a "totals" row which gives the "grand total" of all numbers in the "Price * Qty" column
let div3b = document.getElementById("3B");
let table3b = createTable("table3b");
div3b.appendChild(table3b);
let table3A = document.getElementById("3A");
table3b.setAttribute("border", "1");
table3b.setAttribute("class", "table table-striped");
table3b.setAttribute("width", "100%");

appendTableHeader(table3b, table3A.children[0].children[0].children[0].children[0].innerHTML, table3A.children[0].children[0].children[0].children[1].innerHTML, table3A.children[0].children[0].children[0].children[2].innerHTML, "Total");

for (let i = 1; i < table3A.children[0].children[0].children.length; i++) {
  appendTable(table3b, table3A.children[0].children[0].children[i].children[0].innerHTML, table3A.children[0].children[0].children[i].children[1].innerHTML, table3A.children[0].children[0].children[i].children[2].innerHTML);
}
appendTable(table3b, "Grand Total","", Quantity());

function Quantity() {
  let tbl = document.getElementById("table3b");
  let totalQ = 0;
  for (let i = 1; i < tbl.children[0].childElementCount; i++) {
      let q = tbl.children[0].children[i].children[2].innerHTML;
      q = parseFloat(q);
      totalQ += q;
  }
  return totalQ.toString();
}

function appendTable(tableobj, col1, col2, col3) {
  // create column (table division) DOM objects
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  let td3 = document.createElement("td");
  let td4 = document.createElement("td");
  // insert content into columns
  td1.innerHTML = col1;
  td2.innerHTML = col2;
  td3.innerHTML = col3;
  if (col1 != "Grand Total")
      td4.innerHTML = Total(col2, col3);
  else {
    td1.setAttribute("style","border-right:0px");
    td2.setAttribute("style","border-left: 0px");
      td4.innerHTML = totalPrice();
  }

  function Total(col2, col3) {
      let p = col2;
      p = parseFloat(p);
      let q = col3;
      q = parseFloat(q);
      let total = p * q;
      return total.toString();
  }

  function totalPrice() {
          let totalPrice = 0;
          for (let i = 1; i < tableobj.children[0].children.length; i++) {
              let p = tableobj.children[0].children[i].children[3].innerHTML;
              p = parseFloat(p);
              totalPrice += p;
          }
          return "$ "+ totalPrice.toString();
      }
      // create table row DOM object
  let tr = document.createElement("tr");
  // append table divisions (columns) to table row
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  // append the row to the tbody element in the table
  tableobj.children[0].appendChild(tr);
}

function appendTableHeader(tableobj, col1, col2, col3, col4) {
      // create column (table division) DOM objects
      let th1 = document.createElement("th");
      let th2 = document.createElement("th");
      let th3 = document.createElement("th");
      let th4 = document.createElement("th");

      // insert content into columns
      th1.innerHTML = col1;
      th2.innerHTML = col2;
      th3.innerHTML = col3;
      th4.innerHTML = col4;
      // create table row DOM object
      let tr = document.createElement("tr");
      // append table divisions (columns) to table row
      tr.appendChild(th1);
      tr.appendChild(th2);
      tr.appendChild(th3);
      tr.appendChild(th4);
      // append the row to the tbody element in the table
      tableobj.children[0].appendChild(tr);
  }
  // 9. Refactor a non-object-oriented form
  // code below is from: https://www.guru99.com/practical-code-examples-using-javascript.html -->

// initialize error div id array
let divs = new Array();
divs[0] = "errFirst";
divs[1] = "errLast";
divs[2] = "errEmail";
divs[3] = "errUid";
divs[4] = "errPassword";
divs[5] = "errConfirm";
// initialize error array
let errors = new Array();
errors[0] = "<span style='color:red'>Please enter your first name!</span>";
errors[1] = "<span style='color:red'>Please enter your last name!</span>";
errors[2] = "<span style='color:red'>Please enter your email!</span>";
errors[3] = "<span style='color:red'>Please enter your user id!</span>";
errors[4] = "<span style='color:red'>Please enter your password!</span>";
errors[5] = "<span style='color:red'>Please confirm your password!</span>";
// function: validate() validate if the user's input is right ot not
function validate(i) {

  // initialize input array
  let inputs = new Array();
  inputs[0] = document.getElementById('first').value;
  inputs[1] = document.getElementById('last').value;
  inputs[2] = document.getElementById('email').value;
  inputs[3] = document.getElementById('uid').value;
  inputs[4] = document.getElementById('password').value;
  inputs[5] = document.getElementById('confirm').value;

  // update error array with error message on a specific box
  let errMessage = errors[i];
  let div = divs[i];
  switch (i) {
      case 2:
          let atpos = inputs[i].indexOf("@");
          let dotpos = inputs[i].lastIndexOf(".");
          if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= inputs[i].length)
              document.getElementById(div).innerHTML = "<span style='color: red'>Enter a valid email address!</span>";
          else
              document.getElementById(div).innerHTML = "OK!";
          break;
      case 5:
          let first = document.getElementById('password').value;
          let second = document.getElementById('confirm').value;
          if (inputs[i] == "")
              document.getElementById(div).innerHTML = errMessage;
          else if (second != first)
              document.getElementById(div).innerHTML = "<span style='color: red'>Your passwords don't match!</span>";
          else
              document.getElementById(div).innerHTML = "OK!";
          break;
      default:
          if (inputs[i] == "")
              document.getElementById(div).innerHTML = errMessage;
          else
              document.getElementById(div).innerHTML = "OK!";
  }
}

// function: finalValidate() when user click the button, program going through all 6 boxes and check if each of them is approriate
function finalValidate() {
  var count = 0;
  //a loop go through every textbox with validate function
  for (i = 0; i < 6; i++) {
      var div = divs[i];
      validate(i);
      if (document.getElementById(div).innerHTML == "OK!")
          count = count + 1;
  }
  if (count == 6)
      document.getElementById("errFinal").innerHTML = "All the data you entered is correct!!!";
}


// 10. Create a more object-oriented form
let div5b = document.getElementById("5B");
// Step 1. Create/append the DOM object 
let form00 = document.getElementById("form00");
let table00 = createTable("table00");
form00.appendChild(table00);
div5b.appendChild(form00);

// Step 2. Create an JS object array containing form info 
let formArray = [{
  label: "First name:",
  inputType: "text",
  id: "First",
  onkeyup: "ObjectValidate(0);",
  errorId: "ObjectErrFirst"
}, {
  label: "Last name:",
  inputType: "text",
  id: "Last",
  onkeyup: "ObjectValidate(1);",
  errorId: "ObjectErrLast"
}, {
  label: "Email:",
  inputType: "text",
  id: "Email",
  onkeyup: "ObjectValidate(2);",
  errorId: "ObjectErrEmail"
}, {
  label: "User id:",
  inputType: "text",
  id: "Uid",
  onkeyup: "ObjectValidate(3)",
  errorId: "ObjectErrUid"
}, {
  label: "Password:",
  inputType: "password",
  id: "Password",
  onkeyup: "ObjectValidate(4);",
  errorId: "ObjectErrPassword"
}, {
  label: "Confirm Password:",
  inputType: "password",
  id: "Confirm",
  onkeyup: "ObjectValidate(5);",
  errorId: "ObjectErrConfirm"
}];

// Step 3. loop through the JS object array to populate the form
for (let i in formArray) {
  // create column (table division) DOM objects
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  let td3 = document.createElement("td");

  let input = document.createElement("input");
  input.setAttribute('type', formArray[i].inputType);
  input.setAttribute('id', formArray[i].id);
  input.setAttribute('onkeyup', formArray[i].onkeyup);

  let divErr = document.createElement("div");
  divErr.setAttribute('id', formArray[i].errorId)
      // insert content into columns
  td1.innerHTML = formArray[i].label;
  td2.appendChild(input);
  td3.appendChild(divErr);
  // create table row DOM object
  let tr = document.createElement("tr");
  // append table divisions (columns) to table row
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  // append the row to the tbody element in the table
  table00.children[0].appendChild(tr);
}

function ObjectValidate(i) {
  // initialize error div id array
  let divsObject = new Array();
  divsObject[0] = "ObjectErrFirst";
  divsObject[1] = "ObjectErrLast";
  divsObject[2] = "ObjectErrEmail";
  divsObject[3] = "ObjectErrUid";
  divsObject[4] = "ObjectErrPassword";
  divsObject[5] = "ObjectErrConfirm";
  // initialize input array
  let inputs = new Array();
  inputs[0] = document.getElementById('First').value;
  inputs[1] = document.getElementById('Last').value;
  inputs[2] = document.getElementById('Email').value;
  inputs[3] = document.getElementById('Uid').value;
  inputs[4] = document.getElementById('Password').value;
  inputs[5] = document.getElementById('Confirm').value;

  // update error array with error message on a specific box
  let errMessage = errors[i];
  let div = divsObject[i];
  switch (i) {
      case 2:
          let atpos = inputs[i].indexOf("@");
          let dotpos = inputs[i].lastIndexOf(".");
          if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= inputs[i].length)
              document.getElementById(div).innerHTML = "<span style='color: red'>Enter a valid email address!</span>";
          else
              document.getElementById(div).innerHTML = "OK!";
          break;
      case 5:
          let first = document.getElementById('Password').value;
          let second = document.getElementById('Confirm').value;
          if (inputs[i] == "")
              document.getElementById(div).innerHTML = errMessage;
          else if (second != first)
              document.getElementById(div).innerHTML = "<span style='color: red'>Your passwords don't match!</span>";
          else
              document.getElementById(div).innerHTML = "OK!";
          break;
      default:
          if (inputs[i] == "")
              document.getElementById(div).innerHTML = errMessage;
          else
              document.getElementById(div).innerHTML = "OK!";
  }
}

// append to tableobj a 3-column table row 
function appendTableRow3(tableobj, col1, col2, col3) {
  // create column (table division) DOM objects
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  let td3 = document.createElement("td");
  // insert content into columns
  td1.innerHTML = col1;
  td2.innerHTML = col2;
  td3.innerHTML = col3;
  // create table row DOM object
  let tr = document.createElement("tr");
  // append table divisions (columns) to table row
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  // append the row to the tbody element in the table
  tableobj.children[0].appendChild(tr);
}

// return a DOM object containing an empty table (with tbody element)
function createTable(id) {
  let table = document.createElement("table");
  table.setAttribute("id", id);
  let tbody = document.createElement("tbody");
  table.appendChild(tbody);
  return table;
}
