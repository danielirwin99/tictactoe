const allSquares = document.querySelectorAll(".board__square");
const title = document.querySelector(".board__title");

let currentPlayer = "X";

let board = new Array(9);

let gameOver = false;

allSquares.forEach((square, i) => {
  // Access the square and access the eventListener
  square.addEventListener("click", () => {
    if (square.innerHTML || gameOver) {
      return;
    }

    square.innerHTML = currentPlayer;

    board[i] = currentPlayer;

    if (checkDraw()) {
      title.innerHTML = "Its a Draw!";
      gameOver = true;
      return;
    }

    if (checkWin()) {
      title.innerHTML = `${currentPlayer} Wins`;
      gameOver = true;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    title.innerHTML = `${currentPlayer}'s Turn`;
  });
});

function restartGame () {
  title.innerHTML = `${currentPlayer}'s Turn`
  allSquares.forEach((square) => {
    square.innerHTML = ""
    
  })
  board = new Array(9)
}

function checkDraw() {
  for (i = 0; i < board.length; ++i) {
    if (!board[i]) {
      return false;
    }
  }
  return true;
}

function checkWin() {
  const winningIndicies = [
    // Horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonal
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningIndicies.length; ++i) {
    const matchingIndicies = winningIndicies[i];
    console.log(matchingIndicies);
    let symbol1 = board[matchingIndicies[0]];
    let symbol2 = board[matchingIndicies[1]];
    let symbol3 = board[matchingIndicies[2]];

    if (!symbol1 || !symbol2 || !symbol3) {
      continue;
    }

    if (symbol1 === symbol2 && symbol2 === symbol3) {
      console.log("winner at", matchingIndicies);
      return true;
    }
  }
}
