import { Link } from 'react-router-dom';

import { coin } from '../../../utils/types';
import { moneyParse, numberParse } from '../../../utils/numbers';
import styles from '../Home.module.css';
const { coinItem, coinItemTitle } = styles;

type CoinItemProps = {
	coin: coin;
};

const classNamer = (num: number) => {
	if (num > 0) {
		return 'pos';
	} else {
		return 'neg';
	}
};

const CoinItem = ({ coin }: CoinItemProps) => {
	return (
		<Link to={`/coins/${coin.id}`} className={`${coinItem}`} key={coin.id}>
			<div className={`${coinItemTitle}`}>
				<div>
					<i
						className={`${coin.liked ? `fa-solid gold` : `fa-regular`} fa-star`}
					></i>
					{coin.market_cap_rank}
				</div>
				<div>
					<img src={coin.image} alt='' />
					{coin.name}
				</div>
			</div>
			<div>{moneyParse(coin.current_price)}</div>
			<div className={classNamer(coin.price_change_percentage_1h_in_currency)}>
				{numberParse(coin.price_change_percentage_1h_in_currency)}%
			</div>
			<div className={classNamer(coin.price_change_percentage_24h)}>
				{numberParse(coin.price_change_percentage_24h)}%
			</div>
			<div className={classNamer(coin.price_change_percentage_7d_in_currency)}>
				{numberParse(coin.price_change_percentage_7d_in_currency)}%
			</div>
			<div>{moneyParse(coin.market_cap)}</div>
			<div>{moneyParse(coin.total_volume)}</div>
		</Link>
	);
};

export default CoinItem;
