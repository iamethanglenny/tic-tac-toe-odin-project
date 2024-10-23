const gameboardFactory = () => {
    return {
        board: ["", "", "", "", "", "", "", "", ""], // 3x3 grid for tic-tac-toe
        displayBoard: function() {
            return this.board;
        },
        setMove: function (index, symbol) {
            if (this.board === "") {
                this.board[index] = symbol;
            }
        }
    };
};
