$( document ).ready(function () {

  var audios = ['https://s3.amazonaws.com/freecodecamp/simonSound1.mp3', 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
                'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3', 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'];


// GAME LOGIC
  var pattern = [];

  var generatePattern = function (arr) {
    var num = Math.floor(Math.random() * 4) + 1;
    arr.push(num);
    // return arr;
  }
  generatePattern(pattern)


  function showPattern () {
    var idx = 0;
    var showId = setInterval(function () {
      console.log(pattern[idx]);
      var id = pattern[idx];
      highlightElement(id, removeHighlight)
      var audio = new Audio(audios[id - 1]);
      audio.play();

      idx += 1;
      if (idx > pattern.length-1) {
        clearInterval(showId);
        checkUserInput(userInput, pattern, showPattern);
      }
    }, 1000);

  }
  showPattern();

  var userInput = [];
  $("div").on("click",function (e) {
    var $clicked = $(this);
    var num = parseInt($clicked.text());
    userInput.push(num);
  });


  function checkUserInput (input, pattern, cb) {
    var idx = 0;
    var wait = 0;
    var checkId = setInterval(function () {
      if (input.length > 0) {
        if (JSON.stringify(input) === JSON.stringify(pattern)) {
          console.log(input);
          clearInterval(checkId);
          console.log("correct");
          userInput = [];
          generatePattern(pattern);
          cb();
        }
        else if (pattern[idx] === input[idx]) {
          idx += 1;
          console.log(input);
        } else {
            clearInterval(checkId);
            console.log("mistake");
        }
      } else {
        if (wait < pattern.length + 1) {
          console.log(userInput);
          wait += 2;
        } else {
          clearInterval(checkId);
          console.log("you lose");

        }

      }

    }, 2000);

  }

});
////////////////////////////////////////////////

// DOM METHODS

function highlightElement (id, cb) {
  $("#" + id).addClass("highlight")
  // var audio = new Audio(audios[(id - 1)]);
  // audio.play();
  setTimeout(function () {
    cb(id)
  }, 500);

}

function removeHighlight(id) {
  $("#" + id).removeClass("highlight")
}




// 1.  generate pattern
//
// 2.  show pattern
//
// 3.  get user input and check if input matches the current pattern
//   a)  if so, repeat steps
