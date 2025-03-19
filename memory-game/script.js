const cardsArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let gameBoard = [];
let flippedCards = [];
let matchedPairs = 0;
let gameActive = true;

const board = document.querySelector('.game-board');
const statusDisplay = document.querySelector('.status');
const restartButton = document.querySelector('.restart-button');

function generateBoard() {
  const cards = [...cardsArray, ...cardsArray];
  cards.sort(() => Math.random() - 0.5); // Shuffle cards

  cards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.value = card;
    board.appendChild(cardElement);
  });

  const cardElements = document.querySelectorAll('.card');
  cardElements.forEach(cardElement => {
    cardElement.addEventListener('click', flipCard);
  });
}

function flipCard() {
  if (!gameActive || flippedCards.length === 2 || this.classList.contains('flipped')) return;

  this.classList.add('flipped');
  this.textContent = this.dataset.value;
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  if (flippedCards[0].dataset.value === flippedCards[1].dataset.value) {
    matchedPairs++;
    flippedCards = [];
    if (matchedPairs === cardsArray.length) {
      statusDisplay.textContent = 'You Win!';
    }
  } else {
    setTimeout(() => {
      flippedCards.forEach(card => {
        card.classList.remove('flipped');
        card.textContent = '';
      });
      flippedCards = [];
    }, 1000);
  }
}

function restartGame() {
  gameActive = true;
  matchedPairs = 0;
  statusDisplay.textContent = '';
  board.innerHTML = '';
  generateBoard();
}

restartButton.addEventListener('click', restartGame);
generateBoard();
