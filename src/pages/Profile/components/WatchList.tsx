import React from 'react';

import {
	moneyParse,
	numberParse,
	classNamer,
	numParse3,
} from '../../../utils/numbers';
import styles from '../Profile.module.css';
const { watchList } = styles;

const WatchList = ({ coins }: any) => {
	return (
		<div className={`${watchList}`}>
			<div></div>
			{coins &&
				Object.values(coins).map((coin: any) => {
					return (
						<div key={coin.id}>
							<div>
								{coin.name}
								<img src={coin.image.thumb} alt='' />
							</div>
							<div>{coin.market_data.current_price.usd}</div>
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
						</div>
					);
				})}
		</div>
	);
};

export default WatchList;
