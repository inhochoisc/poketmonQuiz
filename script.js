// List of questions in this Poketmon quiz
const quizList = [
  {
    quizNumber: 1,
    characterID: 1,
    thumbnailUrl: "assets/images/pikachu.png",
    characterName: "Pikachu",
    answers: ["Purin", "냥이", "Pikachu", "코코"],
  },
  {
    quizNumber: 2,
    characterID: 2,
    thumbnailUrl: "assets/images/bulbasaur.png",
    characterName: "Bulbasaur",
    answers: ["피카", "Bulbasaur", "엘사", "코코"],
  },
  {
    quizNumber: 3,
    characterID: 3,
    thumbnailUrl: "assets/images/chikorita.png",
    characterName: "Chikorita",
    answers: ["Chikorita", "Bulbasaur", "엘사", "코코"],
  },
  {
    quizNumber: 4,
    characterID: 4,
    thumbnailUrl: "assets/images/dragonite.png",
    characterName: "Dragonite",
    answers: ["Chikirita", "Bulbasaur", "Dragonite", "코코"],
  },
];

//Q: let Vs const
//Q: Which is more effective/ faster  to use init() Or to put all functions in doc.ready?
let totalScore = 0;
const getScore = 10; // easy to update later
let timeLeft = 15;
let counter;
let currentQuizNum = 0;
let finalScore = 0;

//Render current quiz number a user is on
const displayQuizNum = () => {
  if (currentQuizNum <= quizList.length) {
    $("#quizNum")
      .html(`${currentQuizNum}/${quizList.length}`)
      .css("letter-spacing", "5px");
  }
};

// Check if user selected answer is correct. If users select the correct answer, they can get 10 points
// Q: Do I need to use preventDefault()?

const checkCorrectAnswer = () => {
  $("#answers").on("click", ".btn", function () {
    const userSelectionIndex = $(this).val();
    // console.log(userSelectionIndex);
    const userSelection =
      quizList[currentQuizNum - 1].answers[userSelectionIndex];
    // console.log(userSelection);

    const correctAnswer = quizList[currentQuizNum - 1].characterName;
    console.log(correctAnswer);
    //Compare caracterName and each property in answers[] one by one. Then get the index of the matching value
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

// Once users select an answer, the other buttons are disabled
const disabledBtn = () => {
  for (let i = 0; i < 4; i++) {
    const answerBtn = $(`#answer${i}`);
    answerBtn.attr("disabled", true);
  }
};

//Reset button on new issue page. Clickable and gray
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
    $("#timer").html(`Timer: ${timeLeft} sec`);
    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(counter);
      disabledBtn();
      if (showQuestion()) {
        timeLeft = 15;
        counter = setInterval(countdown, 1000);
      }
    }
  };

  clearInterval(counter);
  counter = setInterval(countdown, 1000);

  if (currentQuizNum === quizList.length && timeLeft === 0) {
    clearInterval(counter);
    $("#timer").html(`Timer: 0 sec`);
    disabledBtn();
    showResult();
  } else if (currentQuizNum > quizList.length) {
    clearInterval(counter);
    $("#timer").html(`Timer: 0 sec`);
    disabledBtn();
    showResult();
  }
};

let gamePaused = () => {
  gamePaused = false;
  let pausedTimeLeft = 0;

  $("#pauseBtn").on("click", function () {
    gamePaused = true;
    $(".flex-container").fadeTo("slow", 0.5);
    $("#modal-window").fadeIn("slow");
    clearInterval(counter); //stop the timer interval
    pausedTimeLeft = timeLeft;
    console.log(pausedTimeLeft);
  });

  $("#continueBtn").on("click", function () {
    console.log("resume bt clicked");
    gamePaused = false;
    $(".flex-container").fadeTo("slow", 1);
    $("#modal-window").fadeOut("slow");
    pausedTimeLeft = timeLeft;
    console.log(pausedTimeLeft);
    setTimer(); // Start the timer interval again
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

    //Q: Is it not possible to automatically append after creating only one button?
    for (let j = 0; j < 4; j++) {
      $("#answer" + j).html(quizList[currentQuizNum - 1].answers[j]);
    }
    return true;
  } else {
    currentQuizNum = quizList.length + 1;
    return false;
  }
};

// Next question loads when clicking 'next' button
const nextQuestion = () => {
  $("#nextBtn").click(function () {
    if (currentQuizNum < quizList.length) {
      if (showQuestion()) {
        timeLeft = 15;
      }
    } else {
      clearInterval(counter);
      $("#timer").html(`Timer: 0 sec`);
      disabledBtn();
      showResult();
      //disable pause button as well
    }
  });
};

//Hide the result section until the last question is solved
const hideResult = () => {
  $(".show-result").hide();
};

// Result page load with final score and message
const showResult = () => {
  $(".show-result").show();

  finalScore = totalScore;
  $("#finalScore").html(`Total Score : ${finalScore}`).css("color", "yellow");

  //A final message is diffrent based on total score
  if (finalScore >= (getScore * quizList.length) / 2) {
    $("#finalMsg").html("Congratulation!<br> You're a Pokémon Master!");
  } else {
    $("#finalMsg").html(`Wanna be a Pokémon Master? <br>Try Again!`);
  }
};

//Resume the quiz
const resumeQuiz = () => {
  $("#resumeBtn").on("click", () => {
    location.replace("quiz.html"); // Q: there might be a better way. load faster...)
  });
};

//initial page for quiz.html
//Should all functions be included in init()?

const init = function () {
  showQuestion();
  nextQuestion();
  checkCorrectAnswer();
  showScore();
  displayQuizNum();
  setTimer();
  gamePaused();
  hideResult();
  resumeQuiz();
};

// Start doc.ready function
$(() => {
  //Start button in the index page. When cliking start button, render the first quiz
  $(".start-btn").click(() => {
    location.replace("quiz.html");
  });

  init();
}); //End of document.ready

//footer
$("#footerInfo").html(
  `<a href= https://junocollege.com/ target = "_blank">Created @ Juno College</a>`
);
