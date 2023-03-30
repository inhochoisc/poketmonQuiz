// List of questions in the Poketmon quiz game
const quizList = [
  {
    quizNumber: 1,
    characterID: 1,
    thumbnailUrl: "assets/images/pikachu.jpg",
    characterName: "Pikachu",
    answers: ["Purin", "Butterfree", "Pikachu", "Eevee"],
  },
  {
    quizNumber: 2,
    characterID: 2,
    thumbnailUrl: "assets/images/bulbasaur.jpg",
    characterName: "Bulbasaur",
    answers: ["Mewtwo", "Bulbasaur", "Psyduck", "Piplup"],
  },
  {
    quizNumber: 3,
    characterID: 3,
    thumbnailUrl: "assets/images/chikorita.jpg",
    characterName: "Chikorita",
    answers: ["Chikorita", "Bulbasaur", "Eevee", "Mewtwo"],
  },
  {
    quizNumber: 4,
    characterID: 4,
    thumbnailUrl: "assets/images/dragonite.jpg",
    characterName: "Dragonite",
    answers: ["Chikirita", "Bulbasaur", "Dragonite", "Eevee"],
  },
  {
    quizNumber: 5,
    characterID: 5,
    thumbnailUrl: "assets/images/charmander.jpg",
    characterName: "Charmander",
    answers: ["Rowlet", "Charmander", "Dragonite", "Piplup"],
  },
  {
    quizNumber: 6,
    characterID: 6,
    thumbnailUrl: "assets/images/umbreon.jpg",
    characterName: "Umbreon",
    answers: ["Umbreon", "Charmander", "Mewtwo", "Piplup"],
  },
  {
    quizNumber: 7,
    characterID: 7,
    thumbnailUrl: "assets/images/squirtle.jpg",
    characterName: "Squirtle",
    answers: ["Rowlet", "Charmander", "Squirtle", "Piplup"],
  },
  {
    quizNumber: 8,
    characterID: 8,
    thumbnailUrl: "assets/images/psyduck.jpg",
    characterName: "Psyduck",
    answers: ["Rowlet", "Psyduck", "Dragonite", "Pikachu"],
  },
  {
    quizNumber: 9,
    characterID: 9,
    thumbnailUrl: "assets/images/mew.jpg",
    characterName: "Mew",
    answers: ["Rowlet", "Mew", "Dragonite", "Eevee"],
  },
  {
    quizNumber: 10,
    characterID: 10,
    thumbnailUrl: "assets/images/sylveon.jpg",
    characterName: "Sylveon",
    answers: ["Rowlet", "Umbreon", "Dragonite", "Sylveon"],
  },
];

// Initialize varables
let totalScore = 0;
const getScore = 10; // make it easy to update later
let timeLeft = 15;
let counter;
let currentQuizNum = 0;
let finalScore = 0;
let stopTimer;
let timerForLastQuestion;

//Render current quiz number a user is on
const displayQuizNum = () => {
  if (currentQuizNum <= quizList.length) {
    $("#quizNum")
      .html(`${currentQuizNum}/${quizList.length}`)
      .css("letter-spacing", "5px");
  }
};

const displayTimer = () => {
  $("#timer").html(`Timer: ${timeLeft}`);
  timeLeft--;
};

// Check if user selected answer is correct.
// If users select the correct answer, they can get 10 points(const getScore=10)
const checkCorrectAnswer = () => {
  $("#answers").on("click", ".btn", function () {
    const userSelectionIndex = $(this).val();
    const userSelection =
      quizList[currentQuizNum - 1].answers[userSelectionIndex];

    const correctAnswer = quizList[currentQuizNum - 1].characterName;

    //Compare characterName and each property in answers[] one by one. Then get the index of the matching value
    const correctAnswerIndex = () => {
      for (let i = 0; i < 4; i++) {
        const answersName = quizList[currentQuizNum - 1].answers[i];

        if (answersName === correctAnswer) {
          correctIndex = i;
        }
      }
      return correctIndex;
    };

    if (userSelection === correctAnswer) {
      $(this).addClass("btn-success");
      totalScore = totalScore + getScore;
      showScore();
      disabledBtn();
      displayQuizNum();
    } else {
      $(this).addClass("btn-danger");
      $("#answer" + correctAnswerIndex()).addClass("btn-success");
      disabledBtn();
      displayQuizNum();
    }
  });
};

// Once users select an answer, buttons are disabled
const disabledBtn = () => {
  for (let i = 0; i < 4; i++) {
    const answerBtn = $(`#answer${i}`);
    answerBtn.attr("disabled", true);
  }
};

//Reset answer buttons on the newly loaded page
const enabledBtn = () => {
  for (let i = 0; i < 4; i++) {
    const answerBtn = $(`#answer${i}`);
    answerBtn.attr("disabled", false).removeClass("btn-success btn-danger");
  }
};

//Display a total score
const showScore = () => {
  $("#score").html(`Score: ${totalScore}`);
};

//Set countdown timer and set the countdown time to 15 seconds
const setTimer = () => {
  let countdown = () => {
    displayTimer();

    stopTimer = () => {
      clearInterval(counter);
      disabledBtn();
    };

    timerForLastQuestion = () => {
      $("#timer").html(`Timer: 0`); //to solve the time lag between browser and timer, fix the last time as 'o'
      $("#pauseBtn").attr("disabled", true);
      showResult();
    };

    if (timeLeft <= 0) {
      stopTimer();
      if (showQuestion()) {
        timeLeft = 15;
        counter;
      }
    }

    //timer for the last question
    if (currentQuizNum >= quizList.length && timeLeft === 0) {
      stopTimer();
      timerForLastQuestion();
    }
  };

  clearInterval(counter);
  counter = setInterval(countdown, 1000);
};

//Clicking the Pause button stops the timer and pops up a modal window.

let gamePaused = () => {
  gamePaused = false;

  $("#pauseBtn").on("click", function () {
    gamePaused = true;
    $(".flex-container").fadeTo("slow", 0.5);
    $("#modal-window").fadeIn("slow");
    clearInterval(counter);
  });

  // Clicking the Continue button on the modal window, users return to the game screen that was stopped, and the timer will restart.
  $("#continueBtn").on("click", function () {
    gamePaused = false;
    $(".flex-container").fadeTo("slow", 1);
    $("#modal-window").fadeOut("slow");
    setTimer(timeLeft);
    console.log(`Resume  button clicked ${timeLeft}`);
  });
};

// Render new questions
const showQuestion = () => {
  currentQuizNum++;
  displayQuizNum();
  setTimer();
  enabledBtn();

  if (currentQuizNum <= quizList.length) {
    let imageUrl = quizList[currentQuizNum - 1].thumbnailUrl;
    $("#quizImg").attr("src", imageUrl);

    //Question: Is it not possible to automatically append after creating only one button?
    for (let j = 0; j < 4; j++) {
      $("#answer" + j).html(quizList[currentQuizNum - 1].answers[j]);
    }
    return true;
  } else {
    currentQuizNum = quizList.length + 1;
    return false;
  }
};

// clicking Next button loads the next question
const nextQuestion = () => {
  $("#nextBtn").click(function () {
    if (currentQuizNum < quizList.length) {
      if (showQuestion()) {
        timeLeft = 15;
      }
    } else {
      stopTimer();
      timerForLastQuestion();
    }
  });
};

//Hide the result section until the last question is solved
const hideResult = () => {
  $(".show-result").hide();
};

const showResult = () => {
  $(".show-result").show();

  finalScore = totalScore;
  $("#finalScore").html(`Your Score : ${finalScore}`);

  //A final message is different based on total score
  if (finalScore >= (getScore * quizList.length) / 2) {
    $("#finalMsg").html("Congratulation!<br> You're a Pokémon Master!");
  } else {
    $("#finalMsg").html(`Wanna be a Pokémon Master? <br> Try Again!`);
  }
};

//Resume the quiz
const resumeQuiz = () => {
  $("#resumeBtn").on("click", () => {
    location.replace("quiz.html");
  });
};

//initial page for quiz.html
//Question: Which is more effective/ faster  to use init() Or to put all functions in doc.ready?

const init = function () {
  showQuestion();
  nextQuestion();
  checkCorrectAnswer();
  showScore();
  displayQuizNum();
  displayTimer();
  setTimer();
  gamePaused();
  hideResult();
  resumeQuiz();
};

//--------- Start doc.ready function
$(() => {
  //Start button in the index page. When cliking a Start button, render the first quiz
  $(".start-btn").click(() => {
    location.replace("quiz.html");
  });

  init();
}); //---------End of document.ready

//Clicking logo in the sub page, it links to index.html
$("#title-sub").on("click", () => {
  window.location.href = "index.html";
});

//footer
$("#footerInfo").html(
  `<a href= https://junocollege.com/ target = "_blank">Created @ Juno College</a>`
);
