const { winningCombinations, Player, State } = require('./constants');
const Game = require('../models/Game');

exports.playerMove = async (req, res) => {
  const { index, boardState, gameId } = req.body;

  try {
    // Update game in database
    const { _doc: { _id, ...rest } } = await Game.findByIdAndUpdate(gameId, {
      board: boardState,
      //currentPlayer: Player.Player2
    }, { new: true });

    res.json({
      id: gameId,
      ...rest
    });


  } catch (error) {
    res.status(500).json({ error: 'Failed to update game state' });
  }
};

exports.AIMove = async (req, res) => {
  const { boardState, gameId } = req.body;
  let backupIndex;
  for (const combo of winningCombinations) {
    const emptyIndices = combo.filter(index => boardState[index] === null);
    const aIIndices = combo.filter(index => boardState[index] === Player.Player2);
    const playerIndices = combo.filter(index => boardState[index] === Player.Player1);

    if (emptyIndices.length === 0) continue;
    backupIndex = emptyIndices[0];
    if (aIIndices.length >= 1 && playerIndices.length === 0)
      return res.json({ index: emptyIndices[0] });
  }


  try {
    await Game.findByIdAndUpdate(gameId, {
      board: boardState,
      currentPlayer: Player.Player1
    });


    res.json({ index: backupIndex });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update game state' });
  }
};

exports.checkGameState = async (req, res) => {
  const { boardState, player, gameId } = req.body;
  var winner = winningCombinations.some(combination =>
    combination.every(index => boardState[index] === player)
  );
  try {
    const nextState = {
      board: boardState,
      status: winner ? State.Win : State.Ongoing,
      winner: winner ? player : '',
      currentPlayer: player === Player.Player1 ? Player.Player2 : Player.Player1
    };
    // Update game state in database
    const { _doc: { _id, ...rest } } = await Game.findByIdAndUpdate(gameId, {
      ...nextState
    }, { new: true })

    //tie missing

    res.json({
      id: gameId,
      ...rest
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update game state' });
  }
};

exports.getGameById = async (req, res) => {
  const { gameId } = req.params;

  try {
    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    res.json({
      id: game._id,
      board: game.board,
      currentPlayer: game.currentPlayer,
      status: game.status,
      winner: game.winner,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch game' });
  }
};

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
