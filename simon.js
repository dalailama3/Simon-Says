$( document ).ready(function () {

  var audios = ['https://s3.amazonaws.com/freecodecamp/simonSound1.mp3', 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
                'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3', 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'];

  var gameOn = false
  var gameInProgess = false
  var strictMode = false;
  var pattern = [];
  var intervalSecs = 1000;
  var highlightSecs = 500;

  $(".switch .on,.off").on('click', function () {
    var $clicked = $(this)

    var $sibling = $($clicked.siblings("div")[0])

    $clicked.toggleClass('flick')
    $sibling.toggleClass('flick')

    $(".count-display span").toggleClass("hidden")

    gameOn = ($(".on").attr('class') === 'on flick') ? true : false

    if ($(".off").attr("class") === 'off flick') {
      $(".strictLight").removeClass('redlight')
      intervalSecs = 1000;
      highlightSecs = 500;
    }

  });

  $(".strict").on("click", function () {
    if (gameOn) {
      var light = $(".strictLight")
      light.toggleClass("redlight")
      strictMode = strictMode === true ? false : true
    }
    else {
      return
    }


  })

  function reset() {
    $(".count-display").html('<span class="hidden"></span><span class="hidden"></span><h6>COUNT</h6>')
    $(".strictLight").removeClass('redlight')
    strictMode = false
    gameInProgess = false
    pattern = []
    userInput = []
    intervalSecs = 1000
    highlightSecs = 500
  }

// GAME LOGIC

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
    if (gameOn && !gameInProgess) {
      gameInProgess = true;
      $(this).toggleClass()
      generatePattern(pattern)
      showPattern(pattern);
    } else {
      return
    }

  });


  var padded = (num)=> {
    num < 10 ? num = `0${num}` : num = num
    return num
  }

  function showPattern () {
    var patternLen = pattern.length
    if ([5,9,13].indexOf(patternLen) !== -1) { intervalSecs -= 100; highlightSecs -= 100 }
    console.log(intervalSecs)
    $('.count-display').html(`<div class='insert'>${padded(patternLen)}</div><h6>COUNT</h6>`)
    var idx = 0;

    var showId = setInterval(function () {
      if (!gameOn) {
        clearInterval(showId);
        reset()
        return
      }
      else {
        console.log(pattern[idx]);
        var id = pattern[idx];
        highlightElement(id, removeHighlight, highlightSecs)
        var audio = new Audio(audios[id - 1]);
        audio.play();
        idx += 1;

        if (idx > pattern.length-1) {
          clearInterval(showId);
          checkUserInput(userInput, pattern, showPattern);
        }
      }
    }, intervalSecs);
  }


  function checkUserInput (input, pattern, cb) {
    var idx = 0;
    var wait = 0;
    var checkId = setInterval(function () {
      if (!gameOn) {
        clearInterval(checkId)
        reset()
        return
      }
      else {
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
            handleMistake()
          }
        }
      }
    }, 1200)
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

function highlightElement (id, cb, duration = 500) {
  $("#" + id).addClass("highlight")
  setTimeout(function () {
    cb(id)
  }, duration);
}

function removeHighlight(id) {
  $("#" + id).removeClass("highlight")
}
