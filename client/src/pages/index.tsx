import { getLeaderBoard, createNewGame } from '@/controls/gameLogic';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from './HomePage.module.css';
import { PlayerStats } from '@/models/playerStats.interface';

export const sleep = (ms: number) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(true)
  }, ms)
})

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [leaderboard, setLeaderboard] = useState<PlayerStats[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePlayVsAI = async () => {
    setLoading(true);
    setError(null);
    try {
      const { gameId } = await createNewGame();
      await sleep(1000);
      router.push(`/game/${gameId}`)

    } catch (err) {
      setError('Failed to start a new game. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewLeaderboard = async () => {
    if (showLeaderboard) {
      setShowLeaderboard(false);
      return;
    }

    setShowLeaderboard(true);
    setLeaderboardLoading(true);
    setError(null);

    try {
      const resp = await getLeaderBoard();
      setLeaderboard(resp);
    } catch (err) {
      setError('Failed to load leaderboard. Please try again.');
    } finally {
      setLeaderboardLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Welcome to Tic-Tac-Toe!</h1>
        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}
        <div className={styles.buttonGroup}>
          <button className={styles.button} disabled>
            Play vs Player (Coming soon)
          </button>
          <button data-testid={'start-ai-cta'} className={styles.button} onClick={handlePlayVsAI} disabled={loading}>
            {loading ? 'Starting game...' : 'Play vs AI'}
          </button>
          <button data-testid={'leaderboard-cta'} className={styles.button} onClick={handleViewLeaderboard} disabled={leaderboardLoading}>
            {leaderboardLoading ? 'Loading...' : (showLeaderboard ? 'Hide Leaderboard' : 'Show Leaderboard')}
          </button>
        </div>
      </div>
      {showLeaderboard && (
        <div className={styles.leaderboardWrapper} data-testid="leadership-card">
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
                {leaderboard.map((entry: PlayerStats, idx: number) => (
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
}
