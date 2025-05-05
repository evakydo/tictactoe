const { winningCombinations } = require('./constants');

exports.handleGameState = (req, res) => {
  const { index } = req.body;

  if (typeof index !== 'number' || index < 0 || index > 8) {
    return res.status(400).json({ message: 'fail', reason: 'Invalid index' });
  }

  res.json({ message: 'success' });
};

exports.playerMove = (req, res) => {
  const { index, boardState } = req.body;
  const ongoingGame = checkGameState(boardState,'player1')
  if(ongoingGame)
    res.json({ index: index+1 });
  else
    res.json({ index: -1 });
};

exports.AIMove = (req, res) => {
  const { boardState } = req.body;
  let backupIndex;
  for (const combo of winningCombinations) {
    const emptyIndices = combo.filter(index => boardState[index] === null);
    const aIIndices = combo.filter(index => boardState[index] === 'player2');
    const playerIndices = combo.filter(index => boardState[index] === 'player1');

    if (emptyIndices.length === 0) continue;
    backupIndex = emptyIndices[0];
    if (aIIndices.length >= 1 && playerIndices.length === 0) 
      return res.json({ index: emptyIndices[0]});
  }
  res.json({ index: backupIndex});
};

function checkGameState(boardState, player) {
  var winner =  winningCombinations.some(combination =>
    combination.every(index => boardState[index] === player)
  );
  if(winner)
    return false;
  else
    return true;
}
