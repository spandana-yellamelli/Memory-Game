// script.js

const cards = document.querySelectorAll(".card");

let firstCard = null;
let secondCard = null;

let moves = 0;
let score = 0;
let seconds = 0;
let matchedPairs = 0;

let timerStarted = false;
let timer;

const movesText = document.getElementById("moves");
const scoreText = document.getElementById("score");
const timerText = document.getElementById("timer");

const restartButton =
document.getElementById("restart");

function startTimer(){

  timer = setInterval(() => {

    seconds++;

    let mins =
    Math.floor(seconds / 60);

    let secs = seconds % 60;

    if(secs < 10){
      secs = "0" + secs;
    }

    if(mins < 10){
      mins = "0" + mins;
    }

    timerText.innerText =
    `${mins}:${secs}`;

  },1000);

}

function shuffleCards(){

  cards.forEach((card) => {

    let randomPosition =
    Math.floor(Math.random() * 12);

    card.style.order = randomPosition;

  });

}

shuffleCards();

cards.forEach((card) => {

  card.addEventListener("click", () => {

    if(!timerStarted){

      startTimer();

      timerStarted = true;

    }

    if(card === firstCard) return;

    if(secondCard) return;

    card.classList.add("flipped");

    if(!firstCard){

      firstCard = card;

    }else{

      secondCard = card;

      moves++;

      movesText.innerText = moves;

      const firstImage =
      firstCard.querySelector(".back").src;

      const secondImage =
      secondCard.querySelector(".back").src;

      if(firstImage === secondImage){

        score += 10;

        scoreText.innerText = score;

        matchedPairs++;

        if(matchedPairs === 6){

          clearInterval(timer);

          setTimeout(() => {

            alert("You matched everything! ✨");

          },300);

        }

        firstCard = null;
        secondCard = null;

      }else{

        setTimeout(() => {

          firstCard.classList.remove("flipped");

          secondCard.classList.remove("flipped");

          firstCard = null;
          secondCard = null;

        },800);

      }

    }

  });

});

restartButton.addEventListener("click", () => {

  cards.forEach((card) => {

    card.classList.remove("flipped");

  });

  firstCard = null;
  secondCard = null;

  moves = 0;
  score = 0;
  seconds = 0;
  matchedPairs = 0;

  movesText.innerText = 0;
  scoreText.innerText = 0;
  timerText.innerText = "00:00";

  clearInterval(timer);

  timerStarted = false;

  shuffleCards();

});