import { getLeaderBoard, newGameAI } from '@/controls/gameLogic';
import React, { useState } from 'react';
import styles from './HomePage.module.css';
import { checkMove, Cell, initialCells, getAIMove, gameState, checkGameState, Player, imagesPath, isGameOngoing } from '../controls/gameLogic';
import { TTTCell } from './components/TTTCell';

const HomePage = () => {
export const sleep = (ms: number) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(true)
  }, ms)
})

  const [leaderboard, setLeaderboard] = useState([] as any);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);

  const handlePlayVsAI = async () => {
    setLoading(true);
    try {
      const { gameId } = await newGameAI();
      await sleep(1000);
      router.push(`/game/${gameId}`)

    } catch (err) {
      setLoading(false);
      alert('Failed to start a new game.');
    }
  };

  const handleViewLeaderboard = async () => {
    setShowLeaderboard(true);
    setLeaderboardLoading(true);
    const resp = await getLeaderBoard();
    setLeaderboard(resp);
    setLeaderboardLoading(false);

  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Tres en raya</h1>
        <div className={styles.buttonGroup}>
          <button className={styles.button} disabled>
            Play vs Player
          </button>
          <button className={styles.button} onClick={handlePlayVsAI} disabled={loading}>
            {loading ? 'Starting game...' : 'Play vs AI'}
          </button>
          <button className={styles.button} onClick={handleViewLeaderboard} disabled={leaderboardLoading || showLeaderboard}>
            {leaderboardLoading ? 'Loading...' : 'View Leaderboard'}
          </button>
        </div>
      </div>
      {showLeaderboard && (
        <div className={styles.leaderboardWrapper}>
          <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Leaderboard</h2>
          {leaderboardLoading ? (
            <div>Loading leaderboard...</div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Player</th>
                  <th>Wins</th>
                  <th>Draws</th>
                  <th>Losses</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, idx) => (
                  <tr key={idx}>
                    <td>{entry.player}</td>
                    <td>{entry.wins}</td>
                    <td>{entry.draws}</td>
                    <td>{entry.losses}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
