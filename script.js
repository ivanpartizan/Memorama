const playBtnLooneyTunes = document.querySelector(".btnLooneyTunes");
const playBtnDisney = document.querySelector(".btnDisney");
const playBtnFlags = document.querySelector(".btnFlags");

const restartBtn = document.querySelectorAll(".restartBtn");
const introScreen = document.querySelector(".intro");
const game = document.querySelector(".game");
const gameContainer = document.querySelector("#gameContainer");
const modal = document.querySelector(".modal");

const timer = document.querySelector(".timer span");
const moves = document.querySelector(".moves span");
let time,
  minutes = 0,
  seconds = 0;
let numberOfMoves = 0;
moves.innerHTML = numberOfMoves;

let openedCards = [];
let matchedCards = [];

let canAction = true;

function startGameLooneyTunes() {
  let shuffledDeck = shuffle(deckCardsLooneyTunes);

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

function startGameDisney() {
  let shuffledDeck = shuffle(deckCardsDisney);

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

function startGameFlags() {
  let deckFlagsCopy = deckFlags.slice();
  let selectedFlags = [];

  for (let i = 0; i < 8; i++) {
    let randomFlag = deckFlagsCopy.splice(
      Math.floor(Math.random() * deckFlagsCopy.length),
      1
    );
    selectedFlags.push(randomFlag);
    selectedFlags.push(randomFlag);
  }

  let shuffledDeck = shuffle(selectedFlags);

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

const deckCardsLooneyTunes = [
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
const deckCardsDisney = [
  "DonaldDuck.png",
  "DonaldDuck.png",
  "Goofy.png",
  "Goofy.png",
  "Magica.png",
  "Magica.png",
  "Mcquack.png",
  "Mcquack.png",
  "MickeyMouse.png",
  "MickeyMouse.png",
  "MinnieMouse.png",
  "MinnieMouse.png",
  "Pluto.png",
  "Pluto.png",
  "Scrooge.png",
  "Scrooge.png",
];
const deckFlags = [
  "Argentina.png",
  "Austria.png",
  "Bolivia.png",
  "Botswana.png",
  "Colombia.png",
  "Ecuador.png",
  "Estonia.png",
  "Finland.png",
  "Japan.png",
  "Kenya.png",
  "Latvia.png",
  "Mexico.png",
  "Namibia.png",
  "Netherlands.png",
  "NewZealand.png",
  "Norway.png",
  "Panama.png",
  "Russia.png",
  "SolomonIslands.png",
  "SouthAfrica.png",
  "Sweden.png",
  "Tunisia.png",
  "Turkey.png",
  "Uganda.png",
  "Uruguay.png",
  "Venezuela.png",
];

gameContainer.addEventListener("click", function (e) {
  if (canAction) {
    if (e.target.className === "card") {
      flipCard();
    }

    function flipCard() {
      e.target.classList.add("flip");
      addCard();
    }

    function addCard() {
      if (openedCards.length == 0 || openedCards.length == 1) {
        openedCards.push(e.target.firstElementChild);
      }

      compareCards();
    }
  }
});

function compareCards() {
  if (openedCards.length == 2) {
    canAction = false;
    // document.body.style.pointerEvents = "none";
  }

  if (openedCards[0].src == openedCards[1].src && openedCards.length == 2) {
    cardsMatched();
  } else if (
    openedCards[0].src !== openedCards[1].src &&
    openedCards.length == 2
  ) {
    cardsNotMatched();
  }
}

function cardsMatched() {
  setTimeout(function () {
    openedCards[0].parentElement.classList.add("match");
    openedCards[1].parentElement.classList.add("match");
    matchedCards.push(...openedCards);

    gameWon();
    // document.body.style.pointerEvents = "auto";
    canAction = true;

    openedCards = [];
  }, 750);
  countMoves();
}

function cardsNotMatched() {
  setTimeout(function () {
    openedCards[0].parentElement.classList.remove("flip");
    openedCards[1].parentElement.classList.remove("flip");
    // document.body.style.pointerEvents = "auto";
    canAction = true;

    openedCards = [];
  }, 750);
  countMoves();
}

function countMoves() {
  numberOfMoves++;
  moves.innerHTML = numberOfMoves;
}

function gameWon() {
  if (matchedCards.length == 16) {
    stopTimer();
    showStats();
    showModal();
  }
}

function showModal() {
  const closeModal = document.querySelector(".closeBtn");

  modal.style.display = "block";

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

function showStats() {
  const modalContent = document.querySelector(".modal-content");
  const message = document.querySelector(".message");
  message.innerHTML = `<p>You finished the game in ${
    minutes > 1
      ? `${minutes} minutes and`
      : minutes == 1
      ? `${minutes} minute and`
      : ``
  } ${
    seconds > 1 ? `${seconds} seconds` : `${seconds} second`
  }! <br> You needed ${numberOfMoves} moves to complete the game! </p>`;
}

function resetEverything() {
  modal.style.display = "none";
  stopTimer();
  timer.innerHTML = `00:00`;
  seconds = 0;
  minutes = 0;
  numberOfMoves = 0;
  moves.innerHTML = numberOfMoves;

  matchedCards = [];
  openedCards = [];
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
  clearInterval(time);
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

playBtnLooneyTunes.addEventListener("click", () => {
  introScreen.classList.remove("fadeIn");
  introScreen.classList.add("fadeOut");
  game.classList.add("fadeIn");
  startGameLooneyTunes();
});

playBtnDisney.addEventListener("click", () => {
  introScreen.classList.remove("fadeIn");
  introScreen.classList.add("fadeOut");
  game.classList.add("fadeIn");
  startGameDisney();
});

playBtnFlags.addEventListener("click", () => {
  introScreen.classList.remove("fadeIn");
  introScreen.classList.add("fadeOut");
  game.classList.add("fadeIn");
  startGameFlags();
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
