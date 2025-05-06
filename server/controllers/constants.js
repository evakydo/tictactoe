const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const Player = {
  Player1: "player1",
  Player2: "player2",
  None: "none"
};

const State = {
  Win: "win",
  Tie: "tie",
  Ongoing: "ongoing",
  Fail: "fail"
};

exports.winningCombinations = winningCombinations
exports.Player = Player
exports.State = State
