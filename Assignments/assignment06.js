// --- global variables ---

var loans = [
    { loan_year: 2020, loan_amount: 10000.00, loan_int_rate: 0.0453 },
    { loan_year: 2021, loan_amount: 10000.00, loan_int_rate: 0.0453 },
    { loan_year: 2022, loan_amount: 10000.00, loan_int_rate: 0.0453 },
    { loan_year: 2023, loan_amount: 10000.00, loan_int_rate: 0.0453 },
    { loan_year: 2024, loan_amount: 10000.00, loan_int_rate: 0.0453 }
  ]; 
  
  // --- function: loadDoc() ---
  
  //function loadDoc() {
  $(document).ready(function(){ 
    //jquery change document.getElementById with $
    //Also add "#loan_year0" + 1\

    //if there are Ljson in local storage then add it, else get the Ljson then parse it into loans
    if (!localStorage.getItem("Ljson")){
      localStorage.setItem("Ljson", JSON.stringify(loans));
    }
    else {
      let jsonLoans = localStorage.getItem("Ljson");
      loans = JSON.parse(jsonLoans);
    }
    // pre-fill defaults for first loan year
    let firstYear = loans[0].loan_year;
    $("#loan_year0" + 1).val(firstYear++);
    let firstYearLoanAmount = loans[0].loan_amount;
    $("#loan_amt0" + 1).val(firstYearLoanAmount.toFixed(2));
    let firstYearLoanInt = loans[0].loan_int_rate;
    $("#loan_int0" + 1).val(firstYearLoanInt);
    let loanWithInterest = loans[0].loan_amount * (1 + loans[0].loan_int_rate);
    $("#loan_bal0" + 1).text(toComma(loanWithInterest.toFixed(2)));
    
    // pre-fill defaults for other loan years
    for(let i=2; i<6; i++) {
      $("#loan_year0" + i).val(firstYear++);
      $("#loan_year0" + i).attr('disabled','disabled');
      $("#loan_year0" + i).css("background-color", "gray");
      $("#loan_year0" + i).css("color", "white");
      $("#loan_amt0" + i).val(firstYearLoanAmount.toFixed(2));
      $("#loan_int0" + i).val(firstYearLoanInt);
      $("#loan_int0" + i).attr('disabled','disabled');
      $("#loan_int0" + i).css("background-color", "gray");
      $("#loan_int0" + i).css("color", "white");
      loanWithInterest = (loanWithInterest + firstYearLoanAmount) * (1 + firstYearLoanInt);
      $("#loan_bal0" + i).text(toComma(loanWithInterest.toFixed(2)));
    } // end: "for" loop
    
    // all input fields: select contents on fucus
    $("input[type=text]").focus(function() {
      $(this).select();
      $(this).css("background-color", "yellow");

    });

    $("input[type=text]").blur(function() {
      $(this).css("background-color", "white");

      //regular expression, that input need to start with number and end with number, and repeat more than 1 number.
      //no letter accpeted. Change to red when invalid
      let regex = /^[0-9]+\.?[0-9]*$/;
      let str =  $(this).val();
      if(regex.test(str)==false){
        $(this).val("Invalid!");
        $(this).css("background-color", "red");
      }
    });
    
    // set focus to first year: messes up codepen
    // $("#loan_year01").focus();
    $("#loan_year01").blur( function() {
      updateLoansArray("year");
    });

    $("#loan_int01").blur( function() {
      //regular expression, that input need to start with 0 and end with number, and repeat more than 1 number.
      //no letter accpeted. Change to red when invalid
      let regex = /^[0]+\.*[0-9]*$/;
      let str =  $(this).val();
      if(regex.test(str)==false){
        $(this).val("Invalid!");
        $(this).css("background-color", "red");
        updateLoansArray("interest");
      }
      else
        updateLoansArray("interest");
      }); 
  //} // end: function loadDoc()
  });

  //function processForm when click the button
  function processForm(){
        //update loan info in the array
        for(let i=0; i<5; i++) {
          loans[i].loan_amount = parseInt($("#loan_amt0" + (i+1)).val());
        }

        //creates variable too check for interest accured 
        let interest_accured =0;

        // pre-fill defaults for first loan year
        let firstYear = loans[0].loan_year;
        $("#loan_year0" + 1).val(firstYear++);

        let firstYearLoanAmount = loans[0].loan_amount;
        $("#loan_amt0" + 1).val(firstYearLoanAmount.toFixed(2));

        // fill in the first year loan info and interest accured
        let firstYearLoanInt = loans[0].loan_int_rate;
        $("#loan_int0" + 1).val(firstYearLoanInt);
        let loanWithInterest = loans[0].loan_amount * (1 + firstYearLoanInt);
        $("#loan_bal0" + 1).text(toComma(loanWithInterest.toFixed(2)));
        interest_accured = loans[0].loan_amount *firstYearLoanInt;


        // fill other loan years and add up interest accured 
        for(let i=2; i<6; i++) {
          $("#loan_year0" + i).val(firstYear++);

          //disable all interest and year text boxes
          $("#loan_year0" + i).attr('disabled','disabled');
          $("#loan_year0" + i).css("background-color", "gray");
          $("#loan_year0" + i).css("color", "white");
          $("#loan_int0" + i).val(firstYearLoanInt);
          $("#loan_int0" + i).attr('disabled','disabled');
          $("#loan_int0" + i).css("background-color", "gray");
          $("#loan_int0" + i).css("color", "white");
          let loanAmount = loans[i-1].loan_amount;
          $("#loan_amt0" +i).val(loanAmount.toFixed(2));
          interest_accured += (loanWithInterest + loanAmount) *firstYearLoanInt;
          loanWithInterest = (loanWithInterest + loanAmount) * (1 + firstYearLoanInt);
          $("#loan_bal0" + i).text(toComma(loanWithInterest.toFixed(2)));

        } // end: "for" loop

        $("#loan_int_accrued").text( "$" + toComma(interest_accured.toFixed(2)));
        
  }

  function toComma(value){
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
   
      //function updateLoansArray, check either year or interest only
      //then fill in all the approriate value
  function updateLoansArray(check) {
     if (check=="year"){
      loans[0].loan_year = parseInt($("#loan_year01").val());
      for(var i=1; i<5; i++) {
        loans[i].loan_year = loans[0].loan_year + i;
        $("#loan_year0"+ (i+1)).val(loans[i].loan_year);
      }
    }
    else if (check =="interest"){
      loans[0].loan_int_rate = parseFloat($("#loan_int01").val());
      for(var i=1; i<5; i++) {
        loans[i].loan_int_rate = loans[0].loan_int_rate;
        $("#loan_int0"+ (i+1)).val(loans[i].loan_int_rate);
     }
    }
  
    // then set loans info to local storage 
    localStorage.setItem("Ljson", JSON.stringify(loans))
  }

  //Angular Table
  //initialize a module
    let app = angular.module("paymentTable",[]);
    
    //create a controller
    app.controller("myController", function($scope){
      //when button click update the table
      $scope.updateTable = function(){
        //initialize record array
        $scope.record=[];
        //prepare a minimum loan payment to pay in 10 years
        let debt = ($("#loan_bal05").html()).replace(",", "");
        debt = parseFloat(debt);
        let LoanInt = (loans[0].loan_int_rate)/12.0;//monthly
        let time = 10*12; //monthly

        //Monthly Loan Payment (P) = Amount (A) / Discount Factor (D) 
        //Annually = Monthl1y*12
        //D = {[(1 + r)^n] - 1} / [r(1 + r)^n]
        let minPay = (debt/ ((Math.pow((1+LoanInt),time)-1)/(LoanInt * Math.pow((1+LoanInt),time))))*12;
        minPay = toComma(Math.floor(minPay));
        
        let year = parseInt($("#loan_year05").val());
        //add object to the record array
        for(let i=0; i<10;i++){
          let obj={};
          obj.year = year+i+1;
          obj.pmt = minPay;
          obj.int = 0;
          obj.bal= 0;
          $scope.record.push(obj);
        }

        //make payment plan point to record array
        let paymentPlan = $scope.record;
        let rate = loans[0].loan_int_rate;
        minPay = parseFloat(minPay.replace(",", ""));
        let yeBal=0
        let intAmt=0;
        
        //a for loops to run and update the array record
      for(let i=0; i<10;i++){
        //update the yeBal and intAmt with total debt at first
          if (i==0){
            intAmt= (debt-minPay)*(rate);
            yeBal = (debt-minPay)*(1+rate);
          }
          //at the end, only update payment and ignore int and bal
          else if (i==9){
            paymentPlan[i].pmt = toComma(yeBal.toFixed(2));
            paymentPlan[i].int = "-";
            paymentPlan[i].bal = "-";
            break;
          } 
          //if the yeBal - payment less than 0, then only update payment and ignore int and bal
          //also, filter out all balance that are above 0 or "-""
          else if ((yeBal-minPay)*(1+rate)<0){
            paymentPlan[i].pmt = toComma(yeBal.toFixed(2));
            paymentPlan[i].int = "-";
            paymentPlan[i].bal = "-";
            $scope.record=$scope.record.filter(x=> parseFloat(x.bal)>0 ||x.bal=="-");
            break;
          }
          //else, update int 
          else{
            intAmt= (yeBal-minPay)*(rate);
            yeBal = (yeBal-minPay)*(1+rate);
          }
          
          //after done interest amount and year end Balance, update it to the recorda array
          paymentPlan[i].int = toComma(intAmt.toFixed(2));
          paymentPlan[i].bal = toComma(yeBal.toFixed(2));
      }
    
    }
  });
    
  
