exports.handleGameState = (req, res) => {
  const { index } = req.body;

  if (typeof index !== 'number' || index < 0 || index > 8) {
    return res.status(400).json({ message: 'fail', reason: 'Invalid index' });
  }

  console.log('Controller received cell index:' + index);

  res.json({ message: 'success' });
};

exports.playerMove = (req, res) => {
  const { index, boardState } = req.body;
  checkGameState(boardState,'player')
  res.json({ index: index+1 });
};

exports.AIMove = (req, res) => {
  const { index, boardState } = req.body;
  res.json({ index: index+1 });
};

function checkGameState(boardState, player) {
  //winning combinations
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
  var winner =  winningCombinations.some(combination =>
    combination.every(index => boardState[index] === player)
  );
  console.log(player)
  if(winner)
    console.log(player + 'has won')
  else
    console.log('ongoing game')
  boardState.forEach(cell => {
    // if(!cell) {
    //   return false;
    // }
  });
  return true;
}