const gameboardFactory = () => {
    return {
        board: ["", "", "", "", "", "", "", "", ""], // 3x3 grid for tic-tac-toe
        
        displayBoard: function () {
            console.log(this.board);
        },

        setMove: function (index, symbol) {
            if (this.board[index] === "") {
                this.board[index] = symbol;
            }
        },

        resetBoard: function () {
            for (let i = 0; i < this.board.length; i++) {
                this.board[i] = "";
            }
        }
    };
};

const playerFactory = (name, symbol) => {
    let score = 0;
    return {
        name: name,
        symbol: symbol,
        score: score,
    };
};

const gameControllerFactory = (player1, player2, gameboard) => {
    let currentPlayer = player1;
    let roundsPlayed = 0;

    return {
        switchTurn: function () {
            currentPlayer = currentPlayer === player1 ? player2 : player1;
        },

       displayCurrentPlayer: function () {
            return `It's ${currentPlayer.name}'s turn to move.`; // Update the turn display
        },

        playMove: function (index) {
            if (gameboard.board[index] === "") {
            gameboard.setMove(index, currentPlayer.symbol);

            if (this.checkWinner(currentPlayer, gameboard.board)) {
                this.setScore(currentPlayer);
                this.endRound();
            } else if (this.isBoardFull(gameboard.board)) {
                console.log("It's a draw!");
                this.endRound();
            } else {
            this.switchTurn();
            }
        } else {
            console.log("Cell is already filled!"); // Optional: Inform user that the cell is filled
        }
        },

        isBoardFull: function (board) {
            for (let i = 0; i < board.length; i++) {
                if (board[i] === "") {
                    return false;
                }
            }
            return true;
        },

        checkWinner: function(currentPlayer, board) {
            const symbol = currentPlayer.symbol;

            const winningCombinations = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];

            for (const combination of winningCombinations) {
                if (
                    board[combination[0]] === symbol &&
                    board[combination[1]] === symbol &&
                    board[combination[2]] === symbol
                ) {
                    return true;
                }
            }

            return false;
        },

        setScore: function (checkWinner) {
            if (checkWinner === player1) {
                player1.score++;
                console.log("Player 1 wins this round!");
            } else if (checkWinner === player2) {
                player2.score++;
                console.log("Player 2 wins this round!");
            } else {
                console.log("It's a draw!");
            }
        },

        endRound: function () {
            roundsPlayed++;
            if (roundsPlayed < 5) {
                console.log(`Round ${roundsPlayed} is over. Resetting the board.`);
                gameboard.resetBoard();
            } else {
                console.log(`Game Over! 5 rounds have been played!`);
                this.declareOverallWinner();

                const endGameModal = document.getElementById("endGameModal");
                endGameModal.style.display = "block";
                
                // Hide the game board
                const board = document.getElementsByClassName("board");
                board.style.display = "none";
            }
        },

        endGame: function (winner) {
            endGameModal.style.display = "block";
            if (winner === "draw") {
                document.querySelector(".subtitle").textContent = "It's a draw!";
            } else {
                document.querySelector(".subtitle").textContent = `${winner} wins this round!`;
            }
        },

        declareOverallWinner: function() {
            if (player1.score > player2.score) {
                console.log(`${player1.name} is the overall winner!`);
            } else if (player2.score > player1.score) {
                console.log(`${player2.name} is the overall winner!`);
            } else {
                console.log("The game ends in a draw!");
            }
        },

        getRound: function() {
            return roundsPlayed + 1; // Return current round (1-based index)
        },

        getScores1: function() {
            return `${player1.name}: ${player1.score}`;
        },

        getScores2: function() {
            return `${player2.name}: ${player2.score}`;
        },

        finalScore: function() {
            return `${player1.score + 1}`;
        }


    };
};

function ScreenController () {
    // UI Interaction
    const gameboard = gameboardFactory();
    const player1 = playerFactory("Player 1", "X");
    const player2 = playerFactory("Player 2", "O");
    const gameController = gameControllerFactory(player1, player2, gameboard);
    const playerTurnDiv = document.querySelector('.turn');
    const roundDiv = document.querySelector('.round');
    const score1 = document.querySelector('.score1');
    const score2 = document.querySelector('.score2');
    const boardDiv = document.querySelector('.board');
    const finalScore = document.querySelector('.subtitle');

    const updateScreen = () => {
        // Clear the board display
        boardDiv.innerHTML = "";

        // Update player's turn display
        playerTurnDiv.textContent = gameController.displayCurrentPlayer();
        roundDiv.textContent = `Current Round: ${gameController.getRound()}`;
        score1.textContent = `${gameController.getScores1()}`;
        score2.textContent = `${gameController.getScores2()}`;
        finalScore.textContent = `Your final score is: ${gameController.finalScore()}`;


        // Render the game board
        gameboard.board.forEach((cell, index) => {
            const cellButton = document.createElement("button");
            cellButton.classList.add("cell");
            cellButton.textContent = cell;
            cellButton.dataset.index = index; // Set data attribute to identify the cell

            if (cell === "X") {
                cellButton.classList.add("x");
            } else if (cell === "O") {
                cellButton.classList.add("o");
            }

            cellButton.addEventListener("click", () => {
                gameController.playMove(index);
                updateScreen();
            });

            boardDiv.appendChild(cellButton);
        });
    };

    updateScreen(); // Initial render
}

ScreenController();

// Game Start Modal



// Game Over Modal
document.addEventListener("DOMContentLoaded", function() {
    const welcomeModal = document.getElementById("welcomeModal");
    const endGameModal = document.getElementById("endGameModal");
    const gameContainer = document.getElementById("gameContainer");
    const closeModal = document.getElementById("close");
    const modal = document.getElementsByClassName("modal");

    // Show the welcome modal on page load
    welcomeModal.style.display = "block";

    // Function to start the game
    function startGame() {
        welcomeModal.style.display = "none"; // Hide the welcome modal
        gameContainer.style.display = "block"; // Show the game board
    }

    // Attach the startGame function to the button
    document.querySelector(".start").addEventListener("click", startGame);



    // Function to play again (called when "Play Again" button is clicked)
    function playAgain() {
        endGameModal.style.display = "none"; // Hide game over modal
        gameContainer.style.display = "block"; // Show the game board
        gameController.resetGame(); // Reset the game state
        ScreenController();
    }

    // Attach playAgain to the Play Again button
    document.querySelector(".replay").addEventListener("click", playAgain);

    closeModal.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});