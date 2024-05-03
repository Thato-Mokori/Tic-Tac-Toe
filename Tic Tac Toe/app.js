const cellBlock = document.querySelectorAll('.cell');
const restartGameBtn = document.querySelector('.restart');
const statusMessage = document.querySelector('.status');
const probableWins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let options = ['', '', '', '', '', '', '', '', ''];

let activeGame = true;
let currentPlayer = 'X';

const winAlert = () => `Player ${currentPlayer} has won`; 

const drawAlert = () => 'It is a tie';

const playerChange = () => `It's ${currentPlayer}'s turn`;


statusMessage.innerHTML = playerChange();


cellBlock.forEach(cell => {
  cell.addEventListener('click', clickedCellBlock);
});
restartGameBtn.addEventListener('click', gameRestart);

function clickedCellBlock(e) {
  const cellBlock = e.target;
  const cellIndex = parseInt(
    cellBlock.getAttribute('data-cell-index')
  );

  if (options[cellIndex] !== '' || !activeGame) {
    return;
  }

  playedCell(cellBlock, cellIndex);
  getResult();
};

function playedCell(cellBlock, cellIndex) {
  options[cellIndex] = currentPlayer;
  cellBlock.innerHTML = currentPlayer;
};

function getResult() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const condition = probableWins[i];
    let a = options[condition[0]];
    let b = options[condition[1]];
    let c = options[condition[2]];
    if (a === '' || b === '' || c === '') {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusMessage.innerHTML = winAlert();
    activeGame = false;
    return;
  }

  let roundDraw = !options.includes('');
  if (roundDraw) {
    statusMessage.innerHTML = drawAlert();
    activeGame = false;
    return;
  }
  handlePlayer();
};

function handlePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusMessage.innerHTML = playerChange();
};

function gameRestart() {
  activeGame = true;
  currentPlayer = 'X';
  options = ['', '', '', '', '', '', '', '', ''];
  statusMessage.innerHTML = playerChange();
  cellBlock.forEach(cell => cell.innerHTML = '');
}

