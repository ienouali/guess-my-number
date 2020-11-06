/** getting elements from dom */
const elements = {
  btnAgain: document.querySelector(".header__top--btn"),
  result__value: document.querySelector(".result__value"),
  input: document.querySelector(".playing__form--input"),
  btnCheck: document.querySelector(".playing__form--btn-check"),
  labelGuessing: document.querySelector(".guessing"),
  labelScore: document.querySelector("#score"),
  labelHighscore: document.querySelector("#highscore"),
  number: null,
  score: 20,
};
const colors = {
    red : "red",
    green: "#4dbd4d",
    alice : "aliceblue"
}
const labelsStatus = {
  low: "Too low!",
  high: "Too high!",
  right: "Great, correct number !",
  lost: "You lost the game!",
  noNumber: "No number!",
  start: "Start guessing...",
};

function randomNumber() {
  return Math.floor(Math.random() * 20);
}

function check(event) {
  event.preventDefault();
  const { value } = elements.input;
  console.log({ value });
  return value;
}

function playAgain() {
  document.body.style.backgroundColor = "rgb(34, 34, 34)";
  elements.number = randomNumber();
  elements.input.value = "";
  elements.btnCheck.disabled = false;
  elements.labelGuessing.style.color = colors.alice;
  elements.labelGuessing.innerHTML = labelsStatus.start;
  elements.result__value.innerHTML = "?";
  elements.labelScore.innerHTML = 20;
}

function guessingStatus(randomNumber, guessingNumber) {
  console.log({ randomNumber, guessingNumber });

  if (guessingNumber < randomNumber) {
    elements.labelGuessing.innerHTML = labelsStatus.low;
  } 
  else if (guessingNumber > randomNumber) {
    elements.labelGuessing.innerHTML = labelsStatus.high;
  }
   else if (guessingNumber == randomNumber) {
    document.body.style.backgroundColor = colors.green; 

    elements.labelGuessing.innerHTML = labelsStatus.right;
    
    elements.result__value.style.fontWeight = "bold";
    elements.result__value.innerHTML = guessingNumber;
    stopGame("stop");
  }
}

function calcScore(score) {
  elements.labelScore.innerHTML = score;
  if (score == 0) {
    document.body.style.backgroundColor = colors.red;
    elements.labelGuessing.style.color = colors.alice;
    elements.labelGuessing.innerHTML = labelsStatus.lost;
  }
}

function stopGame(score) {
  if (score == 0 || score ==="stop") {
    elements.btnCheck.disabled = true;
  }
}

(function () {
  elements.number = randomNumber();
  elements.score = 20;

  elements.btnCheck.addEventListener("click", (e) => {
    let guessingNumber = check(e);

    if (guessingNumber == "" || guessingNumber <= 0) {
      console.log(guessingNumber);
      elements.labelGuessing.innerHTML = labelsStatus.noNumber;
    }
     else {
      guessingStatus(elements.number, guessingNumber);
      elements.score = elements.score - 1;
      calcScore(elements.score);
      stopGame(elements.score);
    }
  });

  elements.btnAgain.addEventListener("click", (e) => {
    playAgain();
    elements.score = 20;
  });
})();
