import {
  initialCells,
  fetchGame,
  sendMove,
  getAIMove,
  getLeaderBoard,
} from './gameLogic';


/* MOCKS */
const mockServerUri = 'http://test-server.com';
process.env.NEXT_PUBLIC_SERVER_URI = mockServerUri;
global.fetch = jest.fn();

/* TESTS */
describe('Game Logic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchGame', () => {
    it('should fetch game data successfully', async () => {
      const mockGameData = { gameId: '123', boardState: [] };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockGameData),
      });

      const result = await fetchGame('123');
      expect(result).toEqual(mockGameData);
      expect(global.fetch).toHaveBeenCalledWith(
        `${mockServerUri}/api/game/123`,
        expect.any(Object)
      );
    });

    it('should handle fetch error', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
      const result = await fetchGame('123');
      expect(result).toEqual({});
    });
  });

  describe('sendMove', () => {
    it('should send move successfully', async () => {
      const mockResponse = 'success';
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await sendMove(0, '123', ['', '', '', '', '', '', '', '', '']);
      expect(result).toBe(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        `${mockServerUri}/api/playerMove`,
        expect.any(Object)
      );
    });

    it('should handle fetch error', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
      const result = await sendMove(0, '123', ['', '', '', '', '', '', '', '', '']);
      expect(result).toBe('fail');
    });
  });

  describe('getAIMove', () => {
    it('should get AI move successfully', async () => {
      const mockResponse = { index: 4 };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await getAIMove('123', ['', '', '', '', '', '', '', '', '']);
      expect(result).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        `${mockServerUri}/api/AIMove`,
        expect.any(Object)
      );
    });
  });

  describe('getLeaderBoard', () => {
    it('should fetch leaderboard successfully', async () => {
      const mockLeaderboard = [{ player: 'player1', wins: 5 }];
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ leaderboard: mockLeaderboard }),
      });

      const result = await getLeaderBoard();
      expect(result).toEqual(mockLeaderboard);
      expect(global.fetch).toHaveBeenCalledWith(
        `${mockServerUri}/api/leaderboard`,
        expect.any(Object)
      );
    });

    it('should handle fetch error', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
      const result = await getLeaderBoard();
      expect(result).toEqual([]);
    });
  });
}); 