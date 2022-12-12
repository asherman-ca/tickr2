import React from 'react';
import { numberParse } from '../../../utils/numbers';
import { coin } from '../../../utils/types';
import styles from '../Home.module.css';
const { trendingCoin, subHeader, trendingCoins, trendingCoinTitle } = styles;

type trendingCardProps = {
	coins: coin[];
	title: string;
	trend: string;
};

type TrendColors = {
	daily: string;
	weekly: string;
	monthly: string;
};

const trendColors: TrendColors = {
	daily: 'fa-fire neg',
	weekly: 'fa-calendar-week blue',
	monthly: 'fa-calendar-days',
};

const TrendingCard = ({ coins, title, trend }: trendingCardProps) => {
	// console.log(title);
	// {
	// 	console.log('coins', coins);
	// }
	return (
		<div>
			<h3>
				<i
					className={`${trendColors[trend as keyof TrendColors]} fa-solid`}
				></i>
				{title}
			</h3>
			<div className={`${trendingCoins}`}>
				{coins.map((coin, idx) => {
					return (
						<div className={`${trendingCoin}`} id={`${coin.id} + ${idx}`}>
							<div>
								<div className={`${subHeader}`}>{idx + 1}</div>
								<div className={`${trendingCoinTitle}`}>
									<img src={coin.image.thumb} alt='' />
									{coin.name}
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
