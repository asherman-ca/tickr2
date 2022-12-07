import React from 'react';

import { numberParse } from '../../../utils/numbers';
import { coin } from '../../../utils/types';
import styles from '../Home.module.css';
const { trendingCoin, subHeader, trendingCoins, trendingCoinTitle } = styles;

type trendingCardProps = {
	coins: coin[];
	title: string;
};

const TrendingCard = ({ coins, title }: trendingCardProps) => {
	console.log('trend coins', coins);
	return (
		<div>
			<h3>
				<i
					className={`${
						title.includes('Daily') ? 'fa-fire neg' : 'fa-calendar-week'
					} fa-solid`}
				></i>
				{title}
			</h3>
			<div className={`${trendingCoins}`}>
				{coins.map((coin, idx) => {
					return (
						<div className={`${trendingCoin}`}>
							<div>
								<div className={`${subHeader}`}>{idx + 1}</div>
								<div className={`${trendingCoinTitle}`}>
									<img src={coin.image.thumb} alt='' />
									{coin.id}
								</div>
							</div>
							<div
								className={
									coin.market_data.price_change_percentage_24h > 0
										? 'pos'
										: 'neg'
								}
							>
								{numberParse(coin.market_data.price_change_percentage_24h)}%
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default TrendingCard;
