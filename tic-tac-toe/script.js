const cells = document.querySelectorAll('[data-cell]');
const restartButton = document.querySelector('.restart-button');
const statusDisplay = document.querySelector('.status');

let isXTurn = true;
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleClick(event) {
  const clickedCell = event.target;
  const clickedIndex = Array.from(cells).indexOf(clickedCell);

  if (gameState[clickedIndex] !== '' || !gameActive) return;

  gameState[clickedIndex] = isXTurn ? 'X' : 'O';
  clickedCell.textContent = isXTurn ? 'X' : 'O';

  checkGameStatus();
  isXTurn = !isXTurn;
}

function checkGameStatus() {
  for (let i = 0; i < winPatterns.length; i++) {
    const [a, b, c] = winPatterns[i];
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      gameActive = false;
      statusDisplay.textContent = `${gameState[a]} wins!`;
      return;
    }
  }

  if (!gameState.includes('')) {
    gameActive = false;
    statusDisplay.textContent = "It's a draw!";
  }
}

function restartGame() {
  gameState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  isXTurn = true;
  statusDisplay.textContent = '';
  cells.forEach(cell => (cell.textContent = ''));
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);