$( document ).ready(function () {

  var pattern = [3,1,2];

  var generatePattern = function (arr) {
    var num = Math.floor(Math.random() * 4) + 1;
    arr.push(num);
    // return arr;
  }
  generatePattern(pattern)


  function run () {
    var idx = 0;
    var showId = setInterval(function () {
      console.log(pattern[idx]);
      idx += 1;
      if (idx > pattern.length-1) {
        clearInterval(showId);
      }
    }, 1000);
  }
  run();

  var userInput = [];
  $("div").on("click",function (e) {
    var $clicked = $(this);
    var num = parseInt($clicked.text());
    userInput.push(num);
  });


  function checkUserInput (input, pattern) {
    var idx = 0;
    var checkId = setInterval(function () {
      if (input.length > 0) {
        if (JSON.stringify(input) === JSON.stringify(pattern)) {
          console.log(input);
          clearInterval(checkId);
          console.log("correct");
        }
        else if (pattern[idx] === input[idx]) {
          idx += 1;
          console.log(input);
        } else {
            clearInterval(checkId);
            console.log("mistake");
        }
      } else {
        console.log(userInput);
      }

    }, 1000);
  }

  checkUserInput(userInput, pattern);




















});




// 1.  generate pattern
//
// 2.  show pattern
//
// 3.  get user input and check if input matches the current pattern
//   a)  if so, repeat steps
