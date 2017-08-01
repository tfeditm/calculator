$(document).ready(function() {
  
  var button = "";
  var entry = "";
  var entryHistory = "";
  var result = 0;
  var subResult = 0;
  var addition = false;
  var subtraction = false;
  var multiplication = false;
  var division = false;
  var equal = false;
  var temp;
  var newEntry = false;
  var firstNumber = true;
  var decimalPointCounter = 0;
  var ce;
  
  var allClear = function() {
    entry = 0;
    entryHistory = "cleared";
    $("#entry").html(entry);
    $("#entry-history").html(entryHistory);
    entry = "";
    entryHistory = "";
    result = 0;
    subResult = 0;
    addition = false;
    subtraction = false;
    multiplication = false;
    division = false;
    equal = false;
    temp = NaN;
    newEntry = false;
    firstNumber = true;
    decimalPointCounter = 0;
    ce = false;
  };
  
  var writeCorrectAnswer = function(input) {
    var output = input;
    if(input.toString().length > 13) {
      if(input > 9999999999999 || (input < 0.00000000001 && input > 0)) {
        output = input.toExponential(5);
        if(output.toString().length > 13) {
          $("#entry").html("E");
          $("#entry-history").html("Display overflow");
        }
      } else if(input < -999999999999 || (input > -0.0000000001 && input < 0)) {
        output = input.toExponential(5);
        if(output.toString().length > 13) {
          $("#entry").html("E");
          $("#entry-history").html("Display overflow");
        }
      } else {
        var digitsOfWhole;
        digitsOfWhole = (input - (input % 1)).toString().length;
        if(digitsOfWhole === 13 || digitsOfWhole === 12) {
          output = input.toFixed(0);
        } else if(digitsOfWhole < 12) {
          if(input > 0) {
            output = (+input.toFixed(13 - digitsOfWhole -1));
          } else if(input < 0){
            output = (+input.toFixed(13 - digitsOfWhole -2));
          }
        } else {
          console.log("There is an error in writeEntry function.");
        }
      }
    }
    return output;
  };
  
  var deleteButtons = function() {
    button = this.value;
    if(button === "c") {
      allClear();
    }
    if(button === "ce") {
      if(ce) {
        allClear();
      } else {
        if(!newEntry && !firstNumber) {
          // CE after an operator button
          if(equal) {
            // CE after "="
            allClear();
          } else {
            // CE after "+", "-", "×" or "÷"
            entry = "";
            entryHistory = entryHistory.slice(0, -1);
            $("#entry-history").html(entryHistory);
            newEntry = true;
            ce = true;
          }
        } else {
          // CE after a number
          if(firstNumber) {
            entryHistory = "cleared";
            $("#entry-history").html(entryHistory);
            entryHistory = "";
          } else {
            entryHistory = entryHistory.slice(0, (-1 * entry.length));
            $("#entry-history").html(entryHistory);
          }
          entry = "0";
          $("#entry").html(entry);
          entry = "";
          newEntry = false;
          decimalPointCounter = 0;
          ce = true;
        }
      }
    }
  };
  
  var numberButtons = function() {
    //If there is CE after "+", "-", "×" or "÷",
    //and you press a number instead of the new operator,
    //it will give back the preview operator sign:
    if(ce && newEntry) {
      if(addition) {
        entryHistory += "+";
      }
      if(subtraction) {
        entryHistory += "-";
      }
      if(division) {
        entryHistory += "÷";
      }
      if(multiplication) {
        entryHistory += "×";
      }
      $("#entry-history").html(entryHistory);
      
    }
      
      newEntry = true;
    
      //If you write a number after equal sign,
      //it will clear the display and reset variables:
      if(equal) {
        entry = "";
        entryHistory = "";
        result = 0;
        subResult = 0;
        addition = false;
        subtraction = false;
        multiplication = false;
        division = false;
        temp = NaN;
        decimalPointCounter = 0;
        firstNumber = true;
        ce = false;
        equal = false;
      }

      //Get the button value:
      button = this.value;
    
      //Bring decimal point into action:
      if(button === ".") {
        decimalPointCounter ++;
        if(entry === "") {
          // if the entry starts with ".", replace it by "0."
          button = "0.";
        }
        if(decimalPointCounter > 1) {
          // you can write only one decimal point in one number
          button = "";
        }
        if(entry.length === 12) {
          button = "";
        }
      }
      
      //Don't write a lots of zeros as beginning:
      if(button === "0") {
        if(entry === "0") {
          button = "";
        }
      } else {
        if(entry === "0" && decimalPointCounter === 0) {
          entry = "";
          entryHistory = entryHistory.slice(0, -1);
        }
      }
    
      //Max length of number could be 13:
      if(entry.length < 13) {
        entry += button;
        entryHistory += button;
      }
      
      $("#entry").html(entry);
      $("#entry-history").html(entryHistory);
    
    
      //Please count!
      subResult = (+entry);
      if(addition) {
        subResult = (+entry);
      }
      if(subtraction) {
        subResult = -1 * (+entry);
      }
      if(division) {
        subResult = temp / (+entry);
      }
      if(multiplication) {
        subResult = temp * (+entry);
      }
      ce = false;
  };
  
  var operatorButtons = function() {
        
    //If the first button is an operator, the first number will be 0:
    if(entry === "" && firstNumber) {
      entryHistory = "0";
    }
    
    if(ce && newEntry) {
      if(addition || subtraction) {
        result -= subResult;
      }
      addition = false;
      subtraction = false;
      division = false;
      multiplication = false;
    }

    // If an operator button follow after an other operator button
    //replace the first operation by the second
    if(!ce && (!newEntry && (addition || subtraction || division || multiplication))) {
      if(addition || subtraction) {
        result -= subResult;
      }
      addition = false;
      subtraction = false;
      division = false;
      multiplication = false;
      entryHistory = entryHistory.slice(0, -1);
      $("#entry-history").html(entryHistory);
    } else if(ce && (!newEntry && (addition || subtraction || division || multiplication))) {
        if(!isNaN(temp)) {
          subResult = temp;
          addition = false;
          subtraction = false;
          division = false;
          multiplication = false;
          entryHistory = entryHistory.slice(0, -1);
          $("#entry-history").html(entryHistory);
        } else {
          subResult = 0;
          addition = false;
          subtraction = false;
          division = false;
          multiplication = false;
          entryHistory += "0";
          $("#entry-history").html(entryHistory);
        }
    }
      
      if(equal) {
        subResult = result;
        entryHistory = result;
        result = 0;
        equal = false;
      }
    
      addition = false;
      subtraction = false;
      division = false;
      multiplication = false;
            
      button = this.value;
      
      entryHistory += button;
      $("#entry-history").html(entryHistory);
    
      if(button === "+") {
        $("#entry").html(writeCorrectAnswer(result + subResult));
        result = result + subResult;
        addition = true;
      }
    
      if(button === "-") {
        $("#entry").html(writeCorrectAnswer(result + subResult));
        result = result + subResult;
        subtraction = true;
      }
    
      if(button === "÷") {
        $("#entry").html(writeCorrectAnswer(subResult));
        temp = subResult;
        division = true;
      }
    
      if(button === "×") {
        $("#entry").html(writeCorrectAnswer(subResult));
        temp = subResult;
        multiplication = true;
      }

      if(button === "=") {
        result = writeCorrectAnswer(result + subResult);
        subResult = 0;
        $("#entry").html(result);
        equal = true;
      }
      
      entry = "";
      newEntry = false;
      firstNumber = false;
      decimalPointCounter = 0;
      ce = false;
  };
  

  
  $(".delete").on("click", deleteButtons);
  $(".number").on("click", numberButtons);
  $(".operator").on("click", operatorButtons);

});