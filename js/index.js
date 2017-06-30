$(document).ready(function() {

(function calculator(){
  
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
  var reset = true;
  var temp;
  var newEntry = false;
  var firstNumber = true;
  
  function allClear() {
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
    reset = true;
    temp = NaN;
    firstNumber = true;
  }

  
  $(".delete").click(function() {
    button = this.value;
    if(button === "c") {
      allClear();
    }
    if(button === "ce") {
      if(!newEntry && !firstNumber) {
        if(equal) {
          allClear();
        } else {
          if(addition || subtraction) {
            result -= subResult;
          }
          addition = false;
          subtraction = false;
          division = false;
          multiplication = false;
          newEntry = true;
          entry = "";
          entryHistory = entryHistory.slice(0, -1);
          $("#entry-history").html(entryHistory);
        }
      } else {
        entry = Math.abs(entry);
        entry = entry.toString();
        entryHistory = entryHistory.slice(0, (-1 * entry.length));
        if(firstNumber) {
          entryHistory = "cleared";
        }
        $("#entry-history").html(entryHistory);
        if(firstNumber) {
          entryHistory = "";
        }
        entry = "0";
        $("#entry").html(entry);
        if(subtraction) {
          entry = "-";
        } else {
          entry = "";
        }
      }
    }
  });

  $(".number").click(function() {
    
    newEntry = true;
    
    if(equal) {
      entry = "";
      entryHistory = "";
      result = 0;
      subResult = 0;
      addition = false;
      subtraction = false;
      multiplication = false;
      division = false;
      reset = true;
      temp = NaN;
    }
    
    equal = false;

    button = this.value;
    
    if(button === "." && entry === "") {
      button = "0.";
    }
    
    if(entry.length < 13) {
      entry += button;
      entryHistory += button;
    }
    $("#entry").html(entry);
    $("#entry-history").html(entryHistory);

    subResult = (+entry);
    
    if(addition) {
      subResult = (+entry);
    }
    
    if(subtraction) {
      subResult = (+entry);
    }
    
    if(division) {
      subResult = temp / (+entry);
    }
    
    if(multiplication) {
      subResult = temp * (+entry);
    }
    
    if(!reset) {
      $("#entry").html(result + subResult);
    }
  });
  
  
  $(".operator").click(function() {
    
    if(newEntry || equal) {
      
      if(equal) {
        subResult = result;
        entryHistory = result;
        result = 0;
      }
    
      equal = false;
      reset = false;
      addition = false;
      subtraction = false;
      division = false;
      multiplication = false;
      firstNumber = false;
      
      button = this.value;
      
      entryHistory += button;
      $("#entry-history").html(entryHistory);
      
    
      if(button === "+") {
        result += subResult;
        addition = true;
      }
    
      if(button === "-") {
        result += subResult;
        subtraction = true;
      }
    
      if(button === "÷") {
        temp = subResult;
        division = true;
      }
    
      if(button === "×") {
        temp = subResult;
        multiplication = true;
      }

      if(button === "=") {
        result += subResult;
        subResult = 0;
        $("#entry").html(result);
        entryHistory += result;
        $("#entry-history").html(entryHistory);
        equal = true;
      }
    
      if(subtraction) {
        entry = "-";
      } else {
        entry = "";
      }
      newEntry = false;
    }
  });
})();
});