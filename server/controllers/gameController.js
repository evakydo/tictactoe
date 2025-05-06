const { winningCombinations, Player, State} = require('./constants');

exports.playerMove = (req, res) => {
  const { index, boardState } = req.body;
  const ongoingGame = checkGameState(boardState, Player.Player1)
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
    const aIIndices = combo.filter(index => boardState[index] === Player.Player2);
    const playerIndices = combo.filter(index => boardState[index] === Player.Player1);

    if (emptyIndices.length === 0) continue;
    backupIndex = emptyIndices[0];
    if (aIIndices.length >= 1 && playerIndices.length === 0) 
      return res.json({ index: emptyIndices[0]});
  }
  res.json({ index: backupIndex});
};

exports.checkGameState = (req, res) => {
  const { boardState, player } = req.body;
  var winner =  winningCombinations.some(combination =>
    combination.every(index => boardState[index] === player)
  );
  if(winner)
    res.json({ result: State.Win, winner: player });
  else
    res.json({ result: State.Ongoing, winner: Player.None});
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
