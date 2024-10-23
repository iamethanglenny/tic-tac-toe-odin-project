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
        }
    };
};

const gameboard = gameboardFactory();
gameboard.setMove(0, "X");
gameboard.displayBoard();

const playerFactory = (name, symbol) => {
    return {
        name: name,
        symbol: symbol,
    };
};

const player1 = playerFactory("Player 1", "X");
const player2 = playerFactory("Player2", "O");

console.log(player1);

const gameControllerFactory = (player1, player2, gameboard) => {
    let currentPlayer = player1;

    return {
        switchTurn: function () {
            currentPlayer = currentPlayer === player1 ? player2 : player1;
        },
        displayCurrentPlayer: function () {
            console.log(`It's ${currentPlayer.name}'s turn to move.`);
        },
        playMove: function (index) {
            gameboard.setMove(index, currentPlayer.symbol);
            this.switchTurn();
        }
    };
};

const gameController = gameControllerFactory(player1, player2, gameboard);
gameController.displayCurrentPlayer();
gameController.playMove(0);
gameController.displayCurrentPlayer();
