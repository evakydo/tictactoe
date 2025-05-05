import styled from 'styled-components';
import { CellImage } from './CellImage';
import { gameState } from '../../controls/gameLogic';

export const CellElement = styled.div<{ currplayer: string }>`
   width: 75px;
    height: 75px;
    border: 1px solid #333333;
    cursor: ${(props) => (props.currplayer === 'player1' ? 'pointer' : 'default')};
    align-content: center;
`
// todo any => interface
export const TTTCell = ({ data, ...rest }: any) => {
    return <CellElement currplayer={gameState.currPlayer} { ...rest }>
        {data.clicked &&
            <CellImage
                src={data.img}
            />}
    </CellElement>;
}
