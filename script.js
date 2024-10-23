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
                board[i] = "";
            }
        }
    };
};

// console log to check above code.
    const gameboard = gameboardFactory();
    gameboard.setMove(0, "X");
    gameboard.setMove(1, "O");
    gameboard.displayBoard();

const playerFactory = (name, symbol) => {
    let score = 0;
    return {
        name: name,
        symbol: symbol,
        score: score,
    };
};

// console log to check above code.
    const player1 = playerFactory("Player 1", "X");
    const player2 = playerFactory("Player 2", "O");
    console.log(player1);
    console.log(player2);

const gameControllerFactory = (player1, player2, gameboard) => {
    let currentPlayer = player1;
    let roundsPlayed = 0;

    return {
        switchTurn: function () {
            currentPlayer = currentPlayer === player1 ? player2 : player1;
        },

        displayCurrentPlayer: function () {
            console.log(`It's ${currentPlayer.name}'s turn to move.`);
        },

        playMove: function (index) {
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
        },

        isBoardFull: function (board) {
            for (let i = 0; i < board.length; i++) {
                if (board[i] === "") {
                    return false;
                }
            }
            return true;
        },

        checkWinner: function(player, board) {
            const symbol = player.symbol;

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
    };
};

// console log to check above code.
    const gameController = gameControllerFactory(player1, player2, gameboard);
    gameController.displayCurrentPlayer();
    gameController.playMove(0);
    gameController.displayCurrentPlayer();
    gameController.playMove(0);
    gameController.displayCurrentPlayer();
