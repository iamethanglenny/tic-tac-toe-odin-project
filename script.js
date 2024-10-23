const gameboardFactory = () => {
    return {
        board: ["", "", "", "", "", "", "", "", ""], // 3x3 grid for tic-tac-toe
        displayBoard: function () {
            return this.board;
        },
        setMove: function (index, symbol) {
            if (this.board === "") {
                this.board[index] = symbol;
            }
        },
        resetBoard: function () {
            return this.board;
        }
    };
};

const gameControllerFactory = () => {

}

const playerFactory = (name, symbol) => {
    return {
        name: name,
        symbol: symbol
    };
};

const player1 = playerFactory("Player 1", "X");
const player2 = playerFactory("Player2", "O");