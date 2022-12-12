import { coin } from '../../../utils/types';
import styles from '../Home.module.css';
const { coinItem, coinItemTitle } = styles;

type CoinItemProps = {
	coin: coin;
};

const CoinItem = ({ coin }: CoinItemProps) => {
	return (
		<div className={`${coinItem}`} key={coin.id}>
			<div className={`${coinItemTitle}`}>
				<div>
					<i className='fa-regular fa-star'></i>#
				</div>
				<div>{coin.name}</div>
			</div>
			<div>price</div>
			<div>1h</div>
			<div>24h</div>
			<div>7d</div>
			<div>Market Cap</div>
			<div>Volume</div>
		</div>
	);
};

export default CoinItem;
