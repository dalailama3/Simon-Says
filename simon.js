$( document ).ready(function () {

  var audios = ['https://s3.amazonaws.com/freecodecamp/simonSound1.mp3', 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
                'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3', 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'];

  var gameOn = false
  $(".switch .on,.off").on('click', function () {
    var $clicked = $(this)

    var $sibling = $($clicked.siblings("div")[0])

    $clicked.toggleClass('flick')
    $sibling.toggleClass('flick')

    // if ($(".on").attr('class') === 'on flick') {
    //   on = true;
    // }
    if ($(".on").attr('class') === 'on flick') {
      gameOn = true
    } else {
      gameOn = false
    }
  });

// GAME LOGIC
  var strictMode = false;
  var pattern = [];

  var generatePattern = function (arr) {
    var num = Math.floor(Math.random() * 4) + 1;
    arr.push(num);
  }

  var userInput = [];

  $(".sect").on("click", function (e) {
    var $clicked = $(this);
    var num = parseInt($clicked.text());
    highlightElement(num, removeHighlight)
    var audio = new Audio(audios[num - 1]);
    audio.play();
    userInput.push(num);
  });

  var start = $('.start').on("click", ()=> {
    generatePattern(pattern)
    showPattern(pattern);
  });





  var padded = (num)=> {
    num < 10 ? num = `0${num}` : num = num
    return num
  }


  function showPattern () {
    $('.count-display').html(`<div class='insert'>${padded(pattern.length)}</div><h6>COUNT</h6>`)
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
          if (pattern.length === 20) { victory(); } else {
            generatePattern(pattern);
            cb();
          }

        }
        else if (pattern[idx] === input[idx]) {
          idx += 1;
          console.log(input)
        } else {
            clearInterval(checkId);
            handleMistake();
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

    }, 1000);

  }

  function handleMistake() {
    let audio = new Audio('./audio/mistake.mp3')
    audio.play()
    setTimeout(()=> {
      if (strictMode) {
        pattern = []
        userInput = [];
        generatePattern(pattern)
        showPattern()
      } else {
        userInput = []
        showPattern()
      }
    }, 5 * 1000)
  }

  function victory() {
    let audio = new Audio('./audio/victory.mp3')
    audio.play();
    pattern = []
    setTimeout(()=> {
      generatePattern(pattern)
      showPattern()
    }, 14 * 1000)
  }
});
////////////////////////////////////////////////

// DOM METHODS

function highlightElement (id, cb) {
  $("#" + id).addClass("highlight")
  setTimeout(function () {
    cb(id)
  }, 500);
}

function removeHighlight(id) {
  $("#" + id).removeClass("highlight")
}
