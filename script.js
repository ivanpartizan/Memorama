const playBtn = document.querySelector(".intro button");
const restartBtn = document.querySelectorAll(".restartBtn");
console.log(restartBtn);
const introScreen = document.querySelector(".intro");
const game = document.querySelector(".game");

const gameContainer = document.querySelector("#gameContainer");

const timer = document.querySelector(".timer span");
const moves = document.querySelector(".moves span");
let time,
  minutes = 0,
  seconds = 0;
let numberOfMoves = 0;
moves.innerHTML = numberOfMoves;

let openCards = [];
let matchedCards = [];

let canAction = true;

function startGame() {
  let shuffledDeck = shuffle(deckCards);

  for (let i = 0; i < shuffledDeck.length; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    const image = document.createElement("img");

    image.setAttribute("src", "img/" + shuffledDeck[i]);

    card.appendChild(image);
    gameContainer.appendChild(card);
  }
  runTimer();
  canAction = true;
}

const deckCards = [
  "BugsBunny.png",
  "BugsBunny.png",
  "Coyote.png",
  "Coyote.png",
  "DaffyDuck.png",
  "DaffyDuck.png",
  "Martian.png",
  "Martian.png",
  "Pepe.png",
  "Pepe.png",
  "RoadRunner.png",
  "RoadRunner.png",
  "Speedy.png",
  "Speedy.png",
  "Tweety.png",
  "Tweety.png",
];

gameContainer.addEventListener("click", function (e) {
  if (canAction) {
    if (e.target.className === "card") {
      // To console if I was clicking the correct element
      console.log(e.target + " Was clicked");
      // Start the timer after the first click of one card
      // Executes the timer() function
      // if (timeStart === false) {
      //   timeStart = true;
      //   timer();
      // }
      // Call flipCard() function
      flipCard();
    }
    //Flip the card and display cards img
    function flipCard() {
      // When <li> is clicked add the class .flip to show img
      e.target.classList.add("flip");
      // Call addToOpened() function
      // addToOpened();
      addCard();
    }

    function addCard() {
      if (openCards.length == 0 || openCards.length == 1) {
        openCards.push(e.target.firstElementChild);
      }
      console.log(openCards);
      console.log(openCards[0]);
      console.log(openCards[0].src);
      console.log(openCards[1].src);

      compareCards();
    }
  }
});

function compareCards() {
  if (openCards.length == 2) {
    canAction = false;
    document.body.style.pointerEvents = "none";
  }

  if (openCards[0].src == openCards[1].src && openCards.length == 2) {
    console.log("it is match");
    cardsMatched();
  } else if (openCards[0].src !== openCards[1].src && openCards.length == 2) {
    console.log("it is not matched");
    cardsNotMatched();
  }
}

function countMoves() {
  numberOfMoves++;
  console.log(numberOfMoves);
  moves.innerHTML = numberOfMoves;
}

function cardsMatched() {
  setTimeout(function () {
    openCards[0].parentElement.classList.add("match");
    openCards[1].parentElement.classList.add("match");
    // Push the matched cards to the matched array
    matchedCards.push(...openCards);

    // Check to see if the game has been won with all 8 pairs
    // winGame();
    gameWon();
    // Allow for further mouse clicks on cards
    document.body.style.pointerEvents = "auto";
    canAction = true;
    // Clear the opened array
    openCards = [];
  }, 750);
  // Call movesCounter to increment by one
  countMoves();
  console.log(matchedCards);
}

function cardsNotMatched() {
  setTimeout(function () {
    // Remove class flip on images parent element
    openCards[0].parentElement.classList.remove("flip");
    openCards[1].parentElement.classList.remove("flip");
    // Allow further mouse clicks on cards
    document.body.style.pointerEvents = "auto";
    canAction = true;
    // Remove the cards from opened array
    openCards = [];
  }, 750);
  // Call movesCounter to increment by one
  countMoves();
}

function gameWon() {
  if (matchedCards.length == 16) {
    stopTimer();
    showStats();
    showModal();
  }
}
const modal = document.querySelector(".modal");
function showModal() {
  // Access the modal <span> element (x) that closes the modal
  const closeModal = document.querySelector(".closeBtn");
  // When the game is won set modal to display block to show it
  modal.style.display = "block";
  // When the user clicks on <span> (x), close the modal
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    console.log(event.target);
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

function showStats() {
  const modalContent = document.querySelector(".modal-content");
  const message = document.querySelector(".message");
  message.innerHTML = `<p>You finished the game in ${
    minutes > 1 ? `${minutes} minutes` : `${minutes} minute`
  } and ${
    seconds > 1 ? `${seconds} seconds` : `${seconds} second`
  }! <br> You needed ${numberOfMoves} moves to complete the game. </p>`;
  // modalContent.appendChild(message);
  console.log(message);
}

function resetEverything() {
  // Stop time, reset the minutes and seconds update the time inner HTML
  modal.style.display = "none";
  stopTimer();
  timer.innerHTML = `00:00`;
  // timeStart = false;
  seconds = 0;
  minutes = 0;
  // timeCounter.innerHTML =
  //   "<i class='fa fa-hourglass-start'></i>" + " Timer: 00:00";
  // Reset star count and the add the class back to show stars again
  // star[1].firstElementChild.classList.add("fa-star");
  // star[2].firstElementChild.classList.add("fa-star");
  // starCount = 3;
  // Reset moves count and reset its inner HTML
  numberOfMoves = 0;
  moves.innerHTML = numberOfMoves;
  // Clear both arrays that hold the opened and matched cards
  matchedCards = [];
  openCards = [];
  // Clear the deck
  removeCard();
  // Create a new deck
  // startGame();
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function runTimer() {
  time = setInterval(() => {
    seconds++;
    if (seconds == 60) {
      minutes++;
      seconds = 0;
    }
    timer.innerHTML = `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
  }, 1000);
}

function stopTimer() {
  // timer.innerHTML = `00:00`;
  // seconds = 0;
  // minutes = 0;
  clearInterval(time);
}

playBtn.addEventListener("click", () => {
  introScreen.classList.remove("fadeIn");
  introScreen.classList.add("fadeOut");
  game.classList.add("fadeIn");
  startGame();
});

restartBtn[0].addEventListener("click", () => {
  game.classList.remove("fadeIn");
  introScreen.classList.add("fadeIn");
  gameContainer.innerHTML = "";
  resetEverything();
});
restartBtn[1].addEventListener("click", () => {
  game.classList.remove("fadeIn");
  introScreen.classList.add("fadeIn");
  gameContainer.innerHTML = "";
  resetEverything();
});
