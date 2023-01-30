import React from 'react';
import { Link } from 'react-router-dom';

import {
	moneyParse,
	numberParse,
	classNamer,
	numParse3,
} from '../../../utils/numbers';
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
						return (
							b.market_data.current_price.usd - a.market_data.current_price.usd
						);
					})
					.map((coin: any) => {
						return (
							<Link
								className={`${watchListItem}`}
								to={`/coins/${coin.id}`}
								key={coin.id}
							>
								<div>
									<img src={coin.image.thumb} alt='' />
									{coin.name}
								</div>
								<div>{moneyParse(coin.market_data.current_price.usd)}</div>
								<div
									className={classNamer(
										coin.market_data.price_change_percentage_1h_in_currency.usd
									)}
								>
									{numParse3(
										coin.market_data.price_change_percentage_1h_in_currency.usd
									)}
									%
								</div>
								<div
									className={classNamer(
										coin.market_data.price_change_percentage_24h
									)}
								>
									{numParse3(coin.market_data.price_change_percentage_24h)}%
								</div>
								<div
									className={classNamer(
										coin.market_data.price_change_percentage_7d
									)}
								>
									{numParse3(coin.market_data.price_change_percentage_7d)}%
								</div>
								<div>{moneyParse(coin.market_data.market_cap.usd)}</div>
								<div>{moneyParse(coin.market_data.total_volume.usd)}</div>
							</Link>
						);
					})}
		</div>
	);
};

export default WatchList;
