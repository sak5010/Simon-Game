const buttonColors = ["red", "blue", "green", "yellow"];
const gamePattern = [];
let userClickedPattern = [];
let isStartedGame = false;
let level = 0;

const playSound = (name) => {
  const audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
};

const animatePress = (currentColor) => {
  $(`#${currentColor}`).addClass("pressed");
  setTimeout(() => {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
};

const nextSequence = () => {
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  level++;
  $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  $("h1").text(`Level ${level}`);
};

const checkAnswer = (currentLevel) => {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (currentLevel === gamePattern.length - 1) {
      setTimeout(() => {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    console.log("wrong");
  }
};

$(document).on("keypress", () => {
  if (!isStartedGame) {
    nextSequence();
  }
});

$(".btn").on("click", (event) => {
  const userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});
