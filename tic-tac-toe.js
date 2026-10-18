document.addEventListener("DOMContentLoaded", function () {
    // Exercise 1: layout the board
    const board = document.getElementById("board");
    const squares = board.getElementsByTagName("div");
    const status = document.getElementById("status");
    const newGameBtn = document.querySelector(".btn");
    const originalStatus = status.textContent;

    // Exercise 2: game state
    let state = new Array(squares.length).fill("");
    let currentPlayer = "X";
    let gameOver = false;

    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    function checkWinner() {
        for (const [a, b, c] of winningCombos) {
            if (state[a] !== "" && state[a] === state[b] && state[a] === state[c]) {
                return state[a];
            }
        }
        return null;
    }

    for (let i = 0; i < squares.length; i++) {
        const square = squares[i];
        square.classList.add("square");

        // Exercise 2 + 6: place X/O, but never overwrite a filled square
        square.addEventListener("click", function () {
            if (gameOver || state[i] !== "") {
                return;
            }

            state[i] = currentPlayer;
            square.textContent = currentPlayer;
            square.classList.add(currentPlayer);

            // Exercise 4: check for a winner
            const winner = checkWinner();
            if (winner) {
                status.textContent = "Congratulations! " + winner + " is the Winner!";
                status.classList.add("you-won");
                gameOver = true;
                return;
            }

            currentPlayer = currentPlayer === "X" ? "O" : "X";
        });

        // Exercise 3: hover styling
        square.addEventListener("mouseover", function () {
            square.classList.add("hover");
        });
        square.addEventListener("mouseout", function () {
            square.classList.remove("hover");
        });
    }

    // Exercise 5: restart the game
    newGameBtn.addEventListener("click", function () {
        for (let i = 0; i < squares.length; i++) {
            squares[i].textContent = "";
            squares[i].classList.remove("X", "O", "hover");
        }
        state = new Array(squares.length).fill("");
        currentPlayer = "X";
        gameOver = false;
        status.textContent = originalStatus;
        status.classList.remove("you-won");
    });
});
