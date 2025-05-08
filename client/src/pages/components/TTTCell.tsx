import { Player } from '../../controls/gameLogic';
import styles from './TTTCell.module.css';

export const TTTCell = ({ data, currentPlayer, ...rest }: any) => {
    return <div className={`${styles.cell} ${currentPlayer === Player.Player1 ? styles.clickable : styles.notClickable}`}
        {...rest}>
        {data.clicked &&
            <img className={styles.moveImg}
                src={data.img}
            />}
    </div>;
}
