import { Link } from 'react-router-dom';

import { moneyParse, classNamer, numParse3 } from '../../../utils/numbers';
import styles from '../Profile.module.css';
const { watchList, watchListItem } = styles;

const WatchList = ({ coins }: any) => {
	return (
		<div className={`${watchList}`}>
			<div>
				<div>Name</div>
				<div>Price</div>
				<div>1h %</div>
				<div>24h %</div>
				<div>7d %</div>
				<div>Market Cap</div>
				<div>Volume</div>
			</div>
			{coins &&
				Object.values(coins)
					.sort((a: any, b: any) => {
						return b.current_price - a.current_price;
					})
					.map((coin: any) => {
						return (
							<Link
								className={`${watchListItem}`}
								to={`/coins/${coin.id}`}
								key={coin.id}
							>
								<div>
									<img src={coin.image} alt='' />
									{coin.name}
								</div>
								<div>{moneyParse(coin.current_price)}</div>
								<div
									className={classNamer(
										coin.price_change_percentage_1h_in_currency
									)}
								>
									{numParse3(coin.price_change_percentage_1h_in_currency)}%
								</div>
								<div className={classNamer(coin.price_change_percentage_24h)}>
									{numParse3(coin.price_change_percentage_24h)}%
								</div>
								<div
									className={classNamer(
										coin.price_change_percentage_7d_in_currency
									)}
								>
									{numParse3(coin.price_change_percentage_7d_in_currency)}%
								</div>
								<div>{moneyParse(coin.market_cap)}</div>
								<div>{moneyParse(coin.total_volume)}</div>
							</Link>
						);
					})}
		</div>
	);
};

export default WatchList;
