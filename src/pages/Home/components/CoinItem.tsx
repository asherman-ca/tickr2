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
	{
		console.log('coin', coin);
	}
	return (
		<div className={`${coinItem}`} key={coin.id}>
			<div className={`${coinItemTitle}`}>
				<div>
					<i className='fa-regular fa-star'></i>
					{coin.market_data.market_cap_rank}
				</div>
				<div>
					<img src={coin.image.thumb} alt='' />
					{coin.name}
				</div>
			</div>
			<div>{moneyParse(coin.market_data.current_price.usd)}</div>
			<div
				className={classNamer(
					coin.market_data.price_change_percentage_1h_in_currency.usd
				)}
			>
				{numberParse(
					coin.market_data.price_change_percentage_1h_in_currency.usd
				)}
			</div>
			<div className={classNamer(coin.market_data.price_change_percentage_24h)}>
				{numberParse(coin.market_data.price_change_percentage_24h)}
			</div>
			<div className={classNamer(coin.market_data.price_change_percentage_7d)}>
				{numberParse(coin.market_data.price_change_percentage_7d)}
			</div>
			<div>{moneyParse(coin.market_data.market_cap.usd)}</div>
			<div>{moneyParse(coin.market_data.total_volume.usd)}</div>
		</div>
	);
};

export default CoinItem;
