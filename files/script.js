const WINS = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');
let board, current, gameOver;

// Build the 9 cells once
const cells = Array.from({ length: 9 }, (_, i) => {
  const btn = document.createElement('button');
  btn.className = 'cell';
  btn.setAttribute('aria-label', 'Cell ' + (i + 1));
  btn.addEventListener('click', () => play(i));
  boardEl.appendChild(btn);
  return btn;
});

function reset() {
  board = Array(9).fill('');
  current = 'X';
  gameOver = false;
  cells.forEach(c => {
    c.textContent = '';
    c.className = 'cell';
    c.disabled = false;
  });
  statusEl.textContent = "Player X's turn";
}

function play(i) {
  if (gameOver || board[i]) return;

  board[i] = current;
  cells[i].textContent = current;
  cells[i].classList.add(current.toLowerCase());
  cells[i].disabled = true;

  const line = WINS.find(([a, b, c]) =>
    board[a] && board[a] === board[b] && board[a] === board[c]
  );

  if (line) {
    line.forEach(idx => cells[idx].classList.add('win'));
    statusEl.textContent = `Player ${current} wins!`;
    endGame();
  } else if (board.every(Boolean)) {
    statusEl.textContent = "It's a draw.";
    endGame();
  } else {
    current = current === 'X' ? 'O' : 'X';
    statusEl.textContent = `Player ${current}'s turn`;
  }
}

function endGame() {
  gameOver = true;
  cells.forEach(c => (c.disabled = true));
}

document.getElementById('reset').addEventListener('click', reset);
reset();
