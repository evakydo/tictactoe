import { render } from '@testing-library/react';
import { TTTCell } from './TTTCell';
import { Player } from '@/models/player.enum';

describe('TTTCell', () => {
    it('renders empty cell when not clicked', () => {
        const { container } = render(
            <TTTCell 
                data={{ clicked: false, img: '' }}
                currentPlayer={Player.Player1}
            />
        );
        expect(container).toMatchSnapshot();
    });

    it('renders clickable cell for Player1', () => {
        const { container } = render(
            <TTTCell 
                data={{ clicked: false, img: '' }}
                currentPlayer={Player.Player1}
            />
        );
        expect(container).toMatchSnapshot();
    });

    it('renders non-clickable cell for Player2', () => {
        const { container } = render(
            <TTTCell 
                data={{ clicked: false, img: '' }}
                currentPlayer={Player.Player2}
            />
        );
        expect(container).toMatchSnapshot();
    });

    it('renders cell with image when clicked', () => {
        const { container } = render(
            <TTTCell 
                data={{ 
                    clicked: true, 
                    img: '/path/to/image.png' 
                }}
                currentPlayer={Player.Player1}
            />
        );
        expect(container).toMatchSnapshot();
    });
}); 