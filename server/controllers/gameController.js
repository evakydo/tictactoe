const { winningCombinations, Player, State } = require('./constants');

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
exports.getLeaderboard = async (req, res) => {
  try {
    // Get all games
    const allGames = await Game.find({});

    // Filter out ongoing games
    const completedGames = allGames.filter(game => game.status !== State.Ongoing);

    // Initialize stats object
    const stats = {
      player1: { wins: 0, losses: 0, draws: 0, points: 0 },
      player2: { wins: 0, losses: 0, draws: 0, points: 0 }
    };

    // Calculate stats
    completedGames.forEach(game => {
      if (game.status === State.Win) {
        if (game.winner === Player.Player1) {
          stats.player1.wins++;
          stats.player2.losses++;
        } else if (game.winner === Player.Player2) {
          stats.player2.wins++;
          stats.player1.losses++;
        }
      } else if (game.status === State.Draw) {
        stats.player1.draws++;
        stats.player2.draws++;
      }
    });

    // Convert to array and sort by points
    const leaderboard = [
      { player: 'Player 1', ...stats.player1 },
      { player: 'Player 2', ...stats.player2 }
    ].sort((a, b) => b.points - a.points);

    res.json({
      leaderboard,
      totalGames: completedGames.length
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
};
