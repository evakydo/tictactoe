import { render, screen, fireEvent } from '@testing-library/react';
// import { getLeaderBoard } from '@/controls/gameLogic';

import HomePage from './index';
import { act } from 'react';

/* MOCKS */
jest.mock('next/router', () => ({
    useRouter() {
        return ({
            route: '/',
            pathname: '',
            query: '',
            asPath: '',
            push: jest.fn(),
            events: {
                on: jest.fn(),
                off: jest.fn()
            },
            beforePopState: jest.fn(() => null),
            prefetch: jest.fn(() => null)
        });
    },
}));

const mockCreateNewGame = jest.fn();

jest.mock('@/controls/gameLogic', () => ({
    getLeaderBoard: () => Promise.resolve(MOCK_LEADERBOARD),
    createNewGame: () => mockCreateNewGame()
}))

const mockServerUri = 'http://test-server.com';
process.env.NEXT_PUBLIC_SERVER_URI = mockServerUri;
global.fetch = jest.fn();


const MOCK_LEADERBOARD = [
    { player: 'Alice', wins: 5, losses: 2 },
    { player: 'Bob', wins: 3, losses: 4 },
    { player: 'You', wins: 2, losses: 1 },
];


/* TESTS */
describe('index - Landing page', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render initial state successfully', async () => {
        const { container } = render(<HomePage />)
        expect(container).toMatchSnapshot();
    });

    it('should render leadership board when clicked', async () => {
        const { container, getByTestId } = render(<HomePage />)

        const viewLeaderboardClick = getByTestId('leaderboard-cta');
        await act(async () => await fireEvent.click(viewLeaderboardClick));
        expect(container).toMatchSnapshot();

        await act(async () => await fireEvent.click(viewLeaderboardClick));

        try {
            const card = getByTestId('leadership-card');
        }
        catch (err) {
            expect(err).toBeTruthy();
        }
    });

    it('should start a new game', async () => {
        const { getByTestId } = render(<HomePage />)
        const startAICTA = getByTestId('start-ai-cta');
        await act(async () => await fireEvent.click(startAICTA));
        expect(mockCreateNewGame).toHaveBeenCalled();
    })
});